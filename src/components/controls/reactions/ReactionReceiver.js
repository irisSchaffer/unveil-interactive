import React from 'react'

import { Observable, Subject } from 'rxjs'
import emotions from './Emotions'

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default

export default class ReactionReceiver extends React.Component {
  static contextTypes = {
    routerState: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      reaction: null
    }
  }

  setup () {
    this.observable = Observable.fromEvent(socket, 'state/slide:reaction')
      .pluck('content')
      .subscribe((reaction) => this.setState({ reaction }))
  }

  tearDown () {
    if (this.observable) {
      this.observable.unsubscribe()
    }
  }

  componentDidMount () {
    this.setup()
  }

  componentWillReceiveProps () {
    this.tearDown()
    this.setup()
  }

  render () {
    return (
      <div className="reaction-receiver">
        {this.state.reaction && (
          <span className="reaction" dangerouslySetInnerHTML={{__html : emotions[this.state.reaction].code}} />
        )}
      </div>
    )
  }

}
