import React from 'react';

import { Observable, Subject } from 'rxjs';

import Voting from '../../voting/Voting';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class VotingNavigatableSetter extends React.Component {
  static contextTypes = {
    stateSubject: React.PropTypes.object.isRequired
  };

  setup () {
    this.startObservable = Observable.fromEvent(socket, 'state/slide/voting:start')
      .subscribe((e) => this.props.stateSubject.next({
        type: 'state/navigation:disable'
      }));

    this.endObservable = Observable.fromEvent(socket, 'state/slide/voting:end')
      .subscribe((e) => this.props.stateSubject.next({
        type: 'state/navigation:enable'
      }));
  }

  tearDown () {
    if (this.startObservable) {
      this.startObservable.unsubscribe();
    }

    if (this.endObservable) {
      this.endObservable.unsubscribe();
    }
  }

  componentWillReceiveProps () {
    this.tearDown()
    this.setup()
  }

  componentDidMount () {
    this.setup()
  }

  render () {
    return false
  }

}
