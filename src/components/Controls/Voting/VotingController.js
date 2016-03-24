import React from 'react';

import { Observable, Subject } from 'rxjs';

import Voting from '../../voting/Voting';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class VotingController extends React.Component {
  static contextTypes = {
    slide: React.PropTypes.node.isRequired,
    stateSubject: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)

    this.state = { hasVoting: false }
  }

  setup () {
    this.socketObservable = Observable.fromEvent(socket, 'state/slide/voting:answer')
      .do((e) => console.log('receiving', e))
      .subscribe((e) => this.props.stateSubject.next(e));

    this.stateObservable = this.context.stateSubject
      .do((e) => console.log('sending answer', e))
      .subscribe((answer) => socket.emit('state/slide/voting:answer', {answer}))
  }

  setVoting () {
    const votings = React.Children.toArray(this.context.slide.props.children).reduce((votings, child) => {
      console.log(votings, child, Voting.isVoting(child))
      if (Voting.isVoting(child)) {
        votings.push(child)
      }

      return votings
    }, [])

    console.log(votings)

    if (votings.length > 0) {
      const voting = votings[0]
      // for now just look at the first one, we don't care about others
      this.setState({
        hasVoting: true,
        voting: voting
      })

      if (this.votingObserver) {
        this.votingObserver.dispose()
      }
    } else {
      this.setState({
        hasVoting: false
      })
    }
  }

  tearDown () {
    if (this.socketObservable) {
      this.socketObservable.unsubscribe();
    }

    if (this.stateObservable) {
      this.stateObservable.unsubscribe();
    }
  }

  componentWillReceiveProps () {
    this.tearDown()
    this.setup()
    this.setVoting()
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.hasVoting && !nextState.hasVoting) {
      socket.emit('state/slide/voting:started', {});
    }
  }

  componentDidMount () {
    this.setup()
    this.setVoting()
  }

  render () {
    return false
  }

}
