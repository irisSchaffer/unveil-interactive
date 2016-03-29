import React from 'react';

import { Observable, Subject } from 'rxjs';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class VotingCreator extends React.Component {
  static contextTypes = {
    routerState: React.PropTypes.object.isRequired,
  };

  defaultState = {
      creatingMode: false,
      question:     '',
      answers:      ['']
  };

  constructor (props) {
    super(props)

    this.state = this.defaultState
    this.toggleCreatingMode = this.toggleCreatingMode.bind(this)
    this.changeAnswer = this.changeAnswer.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.create = this.create.bind(this)
  }

  toggleCreatingMode () {
    this.setState({
      ...this.defaultState,
      creatingMode: !this.state.creatingMode
    })
  }

  changeAnswer (index) {
    return (event) => {
      let answers = this.state.answers
      answers[index] = event.target.value
      this.setState({answers: answers})
    }
  }

  addAnswer () {
    let answers = this.state.answers
    answers.push("")
    this.setState({answers: answers})
  }

  getButton () {
    return (
      <button className="voting-creator" onClick={this.toggleCreatingMode}>
        <i className="fa fa-fw fa-tasks"></i>
      </button>
    )
  }

  create () {
    const question = this.refs.question.value
    const answers = this.state.answers.filter((answer) => answer.length > 0)

    if (answers.length > 0 && question.length > 0) {
      socket.emit('state/slide/voting:add', {
        question,
        answers,
        location: this.context.routerState
      })
    }

    this.toggleCreatingMode()
  }

  render () {
    if (!this.state.creatingMode) return this.getButton()

    else return (
      <div>
        {this.getButton()}
        <div className="modal voting-creator">
          <div className="modal-content">
            <h2>Create Voting</h2>
            <div className="field">
              <label>Question</label> <input type="text" placeholder="Question" ref="question" />
            </div>

            <div className="field">
              <label>
                Answers
                <button className="small" onClick={this.addAnswer}><i className="fa fa-fw fa-plus"></i></button>
              </label>
              {this.state.answers.map((answer, index) => (
                  <input type="text" key={index} onChange={this.changeAnswer(index)} value={answer} placeholder={'Answer ' + (index + 1)}/>
              ))}
            </div>

            <div className="modal-buttons">
              <button className="primary" onClick={this.create}><i className="fa fa-plus"></i> Create Voting</button>
              <button onClick={this.toggleCreatingMode}><i className="fa fa-times"></i> Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
