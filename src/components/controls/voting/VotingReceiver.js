import React from 'react';

import { Observable } from 'rxjs';

import Voting from '../../voting/Voting';
import Question from '../../voting/Question';
import Answer from '../../voting/Answer';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class VotingReceiver extends React.Component {
  static propTypes = {
    stateSubject: React.PropTypes.object.isRequired
  };

  componentDidMount () {
    this.setup();
  }

  componentWillReceiveProps () {
    this.tearDown();
    this.setup();
  }

  setup () {
    this.observable = Observable.fromEvent(socket, 'state/slide/voting:add')
      .map(this.toStateEvent)
      .distinctUntilChanged()
      .subscribe((e) => this.props.stateSubject.next(e));
  }

  tearDown () {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  }

  toStateEvent (data) {
    const name = data.name
    const question = React.createElement(Question, null, data.question)
    const answers = data.answers.map((answer, index) => {
      return React.createElement(Answer, {value: name + '-' + index}, answer)
    })
    answers.unshift(question)

    return {
      ...data,
      type:   'state/slide:add',
      method: 'after',
      content: React.createElement(Voting, {name: name, key: name}, answers)
    };
  }

  render () {
    return false;
  }

}
