import React from 'react'

import { Observable, Subject } from 'rxjs'

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default
import { Slide } from 'unveil/lib'
import Media from '../../Media'

export default class MediaAcceptor extends React.Component {

  constructor (props) {
    super(props)

    this.popRequest = this.popRequest.bind(this)
    this.accept = this.accept.bind(this)
    this.addRequest = this.addRequest.bind(this)
    this.formatRequest = this.formatRequest.bind(this)
    this.toggleDisturb = this.toggleDisturb.bind(this)

    this.state = {
      disturb:  true,
      requests: []
    }
  }

  componentDidMount () {
    this.setup()
  }

  componentWillReceiveProps () {
    this.tearDown()
    this.setup()
  }

  setup () {
    this.subject = this.subject || new Subject()

    this.disturbObservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => this.state.disturb)
      .do((e) => console.log('disturb observable'))
      .map(this.formatRequest())
      .subscribe(this.addRequest)

    this.noDisturbObservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => !this.state.disturb)
      .map(this.formatRequest())
      .map((r) => ({...r, method : 'under'}))
      .subscribe((e) => this.subject.next(e))

    this.subjectObservable = this.subject
      .do((e) => console.log('subject observable'))
      .subscribe((media) => socket.emit('state/slide:add', media))
  }

  tearDown () {
    if (this.disturbObservable) {
      this.disturbObservable.unsubscribe()
    }

    if (this.noDisturbObservable) {
      this.noDisturbObservable.unsubscribe()
    }

    if (this.subjectObservable) {
      this.subjectObservable.unsubscribe()
    }
  }

  accept (method) {
    console.log('accepting request')
    return () => this.subject.next({ ...this.popRequest(), method })
  }

  popRequest (method) {
    const request = this.state.requests[0]
    this.setState({requests: this.state.requests.slice(1)})

    return request
  }

  addRequest (request) {
    let requests = this.state.requests
    requests.push(request)
    this.setState({requests: requests})
  }

  formatRequest () {
    return function (data) {
      return {
        media:    data,
        location: data.location,
      }
    }
  }

  toggleDisturb () {
    this.setState({disturb: !this.state.disturb});
  }

  getButton () {
    let buttonClass = 'media-acceptor-button ' + (this.state.disturb && 'enabled' || 'disabled')
    let iconClass = 'fa fa-fw ' + (this.state.disturb && 'fa-bell-o' || 'fa-bell-slash-o')
    return (
      <button className={buttonClass} onClick={this.toggleDisturb}>
        <i className={iconClass}></i>
      </button>
    )
  }

  render () {
    if (this.state.requests.length === 0) {
      return this.getButton();
    }

    return (
      <div>
        {this.getButton()}
        <div className="modal media-acceptor">
          <div className="modal-content">
            <h2>Incoming Request for page "{this.state.requests[0].location.pathname}"</h2>
            <div className="media-acceptor-request">
              {React.createElement(Media, {data: this.state.requests[0].media})}
            </div>
            <div className="modal-buttons">
              <button className="primary" onClick={this.accept('under')}><i className="fa fa-fw fa-level-down"></i> Subslide</button>
              <button className="primary" onClick={this.accept('after')}><i className="fa fa-fw fa-level-up fa-rotate-90"></i> Main Slide</button>
              <button onClick={this.popRequest}><i className="fa fa-times"></i> Go Away!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
