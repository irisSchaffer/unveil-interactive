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

  getVoting (context) {
    const votings = React.Children.toArray(context.slide.props.children).reduce((votings, child) => {
      if (Voting.isVoting(child)) {
        votings.push(child)
      }

      return votings
    }, [])

    if (votings.length > 0) {
      // ignore other votings
      return votings[0]
    }

    return false
  }

  componentDidUpdate (prevProps, prevState, prevContext) {
    const prevVoting = this.getVoting(prevContext)
    const voting     = this.getVoting(this.context)

    const differentVoting = prevVoting && voting && prevVoting.props.name !== voting.props.name
    if (!prevVoting && voting || differentVoting) {
      console.log('start voting')
      socket.emit('state/slide/voting:start', {data: voting.props.name});
    }

    if (prevVoting && !voting || differentVoting) {
      console.log('end voting')
      socket.emit('state/slide/voting:end', {data: prevVoting.props.name});
    }
  }

  componentDidMount () {
    const voting = this.getVoting(this.context)
    if (voting) {
      console.log('starting voting')
      socket.emit('state/slide/voting:start', {data: voting.props.name});
    }
  }

  render () {
    return false
  }

}
