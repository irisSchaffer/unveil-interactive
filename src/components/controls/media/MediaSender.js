import React from 'react';

import { Observable, Subject } from 'rxjs';
import IFrame from '../../IFrame';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class MediaSender extends React.Component {
  static contextTypes = {
    routerState: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)

    this.share = this.share.bind(this)
    this.fileChange = this.fileChange.bind(this)
    this.toggleSharingMode = this.toggleSharingMode.bind(this)

    this.state = {
      sharingMode: false
    }
  }

  setup () {
    this.subject = this.subject || new Subject()
    this.fileSubject = this.fileSubject || new Subject()
    this.fileSubject = this.fileSubject || new Subject()

    this.subscription = this.subject
      .map((content) => ({
        content: content,
        location: this.context.routerState
      }))
      .subscribe((data) => {
        socket.emit('state/slide/add:accept', data)
      })

    this.fileSubscription = this.fileSubject
      .pluck('target', 'files', '0')
      .subscribe((file) => {
        console.log(file)
      })

    this.fileReaderSubscription = this.fileReaderSubject
      .
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

  fileChange (evt) {
    this.fileSubject.next(evt)
  }

  toggleSharingMode (event) {
    this.setState({sharingMode: !this.state.sharingMode});
  }

  render () {
    return (
      <div>
        <div className="media-sender">
          <button onClick={this.toggleSharingMode}>
            <i className="fa fa-cloud-upload"></i> Media
          </button>
        </div>

        {this.state.sharingMode && (
          <div className="modal media-sender">
            <div className="modal-content">
              <h2>Share</h2>
              <p>Share your own files like pictures of notes with the presentation!</p>
              <input type="file" className="primary" onChange={this.fileChange} />
              <div className="modal-buttons">
                <button className="primary" onClick={this.share}><i className="fa fa-cloud-upload"></i> Share</button>
                <button onClick={this.toggleSharingMode}><i className="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

}
