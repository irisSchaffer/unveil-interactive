import React from 'react';

import { Observable, Subject } from 'rxjs';
import IFrame from '../../IFrame';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class MediaSender extends React.Component {
  static contextTypes = {
    routerState: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.share = this.share.bind(this)
    this.fileChange = this.fileChange.bind(this)
    this.toggleSharingMode = this.toggleSharingMode.bind(this)

    this.state = {
      sharingMode: false,
      content    : null,
      loaded     : 0,
    }
  }

  setup () {
    this.subject = this.subject || new Subject()
    this.fileSubject = this.fileSubject || new Subject()
    this.fileReaderSubject = this.fileReaderSubject || new Subject()

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
      .do(() => this.setUpFileReader())
      .subscribe((file) => this.fileReader.readAsDataURL(file))

    this.fileReaderSubscription = this.fileReaderSubject
      .pluck('target', 'result')
      .subscribe((url) => this.setState({ content: url }))
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
    this.subject.next(this.state.content)
    this.toggleSharingMode()
  }

  setUpFileReader () {
    this.fileReader = new FileReader()
    this.fileReader.onload = (evt) => this.fileReaderSubject.next(evt)
    this.fileReader.onprogress = (evt) => this.setState({ loaded: Math.round((evt.loaded / evt.total) * 100) })
  }

  fileChange (evt) {
    this.setState({ loaded: 0 })
    this.fileSubject.next(evt)
  }

  toggleSharingMode (event) {
    this.setState({sharingMode: !this.state.sharingMode, loaded: 0})
  }

  render () {
    return (
      <div className="media-sender">
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
              {this.state.loaded > 0 && `${this.state.loaded}%`}
              <div className="modal-buttons">
                <button className="primary" onClick={this.share} disabled={(this.state.loaded < 100)}>
                  <i className="fa fa-cloud-upload"></i> Share
                </button>
                <button onClick={this.toggleSharingMode}><i className="fa fa-times"></i> Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
