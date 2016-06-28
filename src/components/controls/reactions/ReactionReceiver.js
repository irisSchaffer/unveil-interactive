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

    this.getReactions = this.getReactions.bind(this)

    this.state = {
      reactions: {}
    }
  }

  setup () {
    const reaction = (code, indices) => {
      const reactions = this.getReactions(indices)

      return {
        ...reactions,
        [code] : reactions[code] + 1 || 1
      }
    }

    this.observable = Observable.fromEvent(socket, 'state/slide:reaction')
      .subscribe((data) => this.setState({ reactions : {
        ...this.state.reactions,
        [data.location.indices[0]]: reaction(data.content, data.location.indices)
      }}))
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

  getReactions (indices = [0]) {
    let reactions = this.state.reactions[indices[0]] || {}

    return reactions || {}
  }

  render () {
    const reactions = this.getReactions(this.context.routerState.indices)
    return (
      <div className="reaction-receiver">
        {Object.keys(reactions).reverse().map((key) => (
            <span className="reaction" key={key}>
              <span className="reaction-emotion" dangerouslySetInnerHTML={{__html : emotions[key].code}} />
              <span className="reaction-count">{reactions[key]}</span>
            </span>
        ))}
      </div>
    )
  }

}
