import React from 'react';
import { Observable } from 'rxjs';

import Question from './Question';
import Answer   from './Answer';
import Result from './Result';

let socket = require('../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class Voting extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  };

  static contextTypes = {
    stateSubject: React.PropTypes.object.isRequired,
    mode:         React.PropTypes.string.isRequired,
    navigatable:  React.PropTypes.bool
  };

  static isVoting (e) {
    return React.isValidElement(e) && e.type.name === 'Voting'
  };

  constructor (props) {
    super(props)

    this.onChange  = this.onChange.bind(this)
    this.onSubmit  = this.onSubmit.bind(this)
    this.addAnswer = this.addAnswer.bind(this)

    this.state = {
      voted:  false,
      results: {
        total: 0
      },
    }
  }

  setup () {
    console.log('setting up')
    this.answerObservable = Observable.fromEvent(socket, 'state/slide/voting:answer')
      .filter((e) => e.voting === this.props.name)
      .pluck('answer')
      .subscribe(this.addAnswer)
  }

  tearDown () {
    console.log('tearing down')

    if (this.answerObservable) {
      this.answerObservable.unsubscribe()
    }
  }

  componentWillUnmount () {
    this.tearDown()
  }

  componentDidUpdate () {
    localStorage.setItem('results-' + this.props.name, JSON.stringify(this.state.results))
    localStorage.setItem('voted-' + this.props.name, JSON.stringify(this.state.voted))
  }

  componentWillMount () {
    this.setState({
      results: JSON.parse(localStorage.getItem('results-' + this.props.name)) || {total: 0},
      voted:   JSON.parse(localStorage.getItem('voted-' + this.props.name)) || false,
    })

    this.setup()
  }

  onChange (event) {
    if (!this.context.navigatable) {
      this.setState({answer: event.target.value})
    }
  }

  addAnswer (answer) {
    const results = this.state.results
    let counter = results[answer]
    if (!counter) {
      counter = 0
    }

    this.setState({
      results: {
        ...results,
        [answer]: counter + 1,
        total:    this.state.results.total + 1
      }
    })
  }

  onSubmit (event) {
    event.preventDefault()
    if (this.state.answer) {
      socket.emit('state/slide/voting:answer', {
        voting: this.props.name,
        answer: this.state.answer
      })

      this.setState({voted: true})
    }
  }

  render () {
    const { name, children } = this.props

    return (
      <div className="voting">
        <form>
          {children
            .filter(child => Question.isQuestion(child))
            .map((question, index) => {
              return (
                <Question {...question.props} key={index}/>
              )
            }
          )}

          <ul>
          {children
            .filter((child) => Answer.isAnswer(child))
            .map((answer) => {
              return (
                <li key={answer.props.value}>
                  {!this.state.voted && this.context.mode === 'default' && (
                    <Answer
                      {...answer.props}
                      checked={this.state.answer === answer.props.value}
                      name={name}
                      onChange={this.onChange}
                    />
                  ) || (
                    <Result
                      counter={this.state.results[answer.props.value] || 0}
                      total={this.state.results.total}
                      title={answer.props.children}
                    />
                  )}
                </li>
              )
            }
          )}
          </ul>

          {!this.state.voted && this.context.mode === 'default' && (
            <button className="primary" type="submit" disabled={this.context.navigatable} onClick={this.onSubmit}>Vote</button>
          )}

        </form>
      </div>
    )
  }

}
