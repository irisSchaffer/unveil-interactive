import React from 'react'

import { Observable, Subject } from 'rxjs'
import emotions from './Emotions'

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class ReactionSender extends React.Component {
  static contextTypes = {
    routerState: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.toggleEmotionMode = this.toggleEmotionMode.bind(this)

    this.state = {
      open: false
    }
  }

  setup () {
    this.subject = this.subject || new Subject()

    this.subscription = this.subject
      .map((content) => ({
        content: content,
        location: this.context.routerState
      }))
      .subscribe((data) => {
        socket.emit('state/slide:reaction', data)
      })
  }

  tearDown () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  componentDidMount () {
    this.setup()
  }

  componentWillReceiveProps () {
    this.tearDown()
    this.setup()
  }
  toggleEmotionMode (event) {
    this.setState({open: !this.state.open})
  }

  render () {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth)
    return (
      <div className="reaction-sender">
        {width <= 768 && (<button className="reaction-opener" onClick={this.toggleEmotionMode} ><i className="fa fa-thumbs-up"></i>  Emotions</button>)}
        <div className="emotions" style={{maxHeight: ((width > 768 || this.state.open) && '150px' || 0)}}>
          {Object.keys(emotions).map((id) => (
            <div key={id} onClick={() => this.subject.next(id)} className="emotion">
              <span className="emotion-code" dangerouslySetInnerHTML={{__html : emotions[id].code}} />
              <span className="emotion-label">{emotions[id].label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

}
