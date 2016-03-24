import React from 'react';
import { Subject } from 'rxjs';

import Answer   from './Answer';
import Question from './Question';

export default class Voting extends React.Component {
  static propTypes = {
    name: React.PropTypes.string

  };

  static contextTypes = {
    stateSubject: React.PropTypes.object.isRequired
  };

  static isVoting (e) {
    return React.isValidElement(e) && e.type.name === 'Voting'
  };

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      open: true
    }
  }

  onChange (event) {
    if (this.state.open) {
      this.setState({answer: event.target.value})
    }
  }

  onSubmit (event) {
    event.preventDefault()
    if (this.state.answer) {
      this.context.stateSubject.next({
        type: 'state/slide/voting:answer',
        data: {
          name:  event.target.name,
          value: event.target.value
        }
      })

      this.closeVoting()
    }
  }

  openVoting () {
    this.setState({open: true})
  }

  closeVoting () {
    console.log('closing voting')
    this.setState({open: false})
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
                  <Answer
                    {...answer.props}
                    checked={this.state.answer === answer.props.value}
                    key={answer.props.value}
                    name={name}
                    onChange={this.onChange}
                  />
                </li>
              )
            }
          )}
          </ul>

          {this.state.open && (<button type="submit" onClick={this.onSubmit}>Vote</button>)}
        </form>
      </div>
    )
  }

}
