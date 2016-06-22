import React from 'react';

import { Observable, Subject } from 'rxjs';
import IFrame from '../../IFrame';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class LinkSender extends React.Component {
  static contextTypes = {
    routerState: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)

    this.toggleSharingMode = this.toggleSharingMode.bind(this)
    this.share = this.share.bind(this)

    this.state = {
      sharingMode: false
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
        socket.emit('state/slide/add:accept', data)
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

  share () {
    this.subject.next(this.refs.textarea.value)
    this.refs.textarea.value = ''
    this.toggleSharingMode()
  }

  toggleSharingMode (event) {
    this.setState({sharingMode: !this.state.sharingMode});
  }

  render () {
    return (
      <div>
        <div className="link-sender">
          <button onClick={this.toggleSharingMode}>
            <i className="fa fa-share-alt"></i> Link
          </button>
        </div>

        {this.state.sharingMode && (
          <div className="modal link-sender">
            <div className="modal-content">
              <h2>Share</h2>
              <p>Share links to related articles and youtube videos with the presentation or ask a question!</p>
              <textarea ref="textarea" />
              <div className="modal-buttons">
                <button className="primary" onClick={this.share}><i className="fa fa-share-alt"></i> Share</button>
                <button onClick={this.toggleSharingMode}><i className="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

}
