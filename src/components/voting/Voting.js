import React from 'react';
import { Subject } from 'rxjs';

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
    mode:         React.PropTypes.string.isRequired
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
      voted:   false,
      started: true,
      ended:   false,
      results: {
        total: 0
      },
    }
  }

  componentDidMount () {
    this.stateObservable = this.context.stateSubject
      .filter((e) => e.type === 'state/slide/voting:answer')
      .pluck('data')
      .filter((e) => e.voting === this.props.name)
      .pluck('answer')
      .subscribe(this.addAnswer)
  }

  onChange (event) {
    if (this.state.started) {
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
      this.context.stateSubject.next({
        type: 'voting:answer',
        data: {
          voting: this.props.name,
          answer: this.state.answer
        }
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
            .map((question) => {
              return (
                <Question {...question.props} />
              )
            }
          )}

          <ul>
          {children
            .filter((child) => Answer.isAnswer(child))
            .map((answer) => {
              return (
                <li>
                  {!this.state.voted && this.context.mode === 'default' && (
                    <Answer
                      {...answer.props}
                      checked={this.state.answer === answer.props.value}
                      key={answer.props.value}
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
            <button className="primary" type="submit" onClick={this.onSubmit}>Vote</button>
          )}

        </form>
      </div>
    )
  }

}
