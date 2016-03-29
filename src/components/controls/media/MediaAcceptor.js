import React from 'react';

import { Observable, Subject } from 'rxjs';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;
import { Slide } from 'unveil/lib';
import Media from '../../Media';

export default React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.setup();
  },

  componentWillReceiveProps: function () {
    this.tearDown();
    this.setup();
  },

  setup: function () {
    this.subject = this.subject || new Subject();

    this.afterOservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => this.state.disturb)
      .map(this.addMethod('under'))
      .subscribe(this.addRequest);

    this.appendObservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => !this.state.disturb)
      .map(this.addMethod('under'))
      .subscribe((e) => this.subject.next(e));

    this.subjectObservable = this.subject
      .subscribe((media) => socket.emit('state/slide:add', media));
  },

  tearDown: function () {
    if (this.afterOservable) {
      this.afterOservable.unsubscribe();
    }

    if (this.appendObservable) {
      this.appendObservable.unsubscribe();
    }

    if (this.subjectObservable) {
      this.subjectObservable.unsubscribe();
    }
  },

  accept: function () {
    this.subject.next(this.popRequest());
  },

  getInitialState: function () {
    return {
      disturb: true,
      requests: []
    };
  },

  popRequest: function () {
    const request = this.state.requests[0]
    this.setState({requests: this.state.requests.slice(1)})

    return request
  },

  addRequest: function (request) {
    let requests = this.state.requests
    requests.push(request)
    this.setState({requests: requests});
  },

  addMethod: function (method) {
    return function (data) {
      return {
        media:    data,
        location: data.location,
        method:   method
      }
    };
  },

  toggleDisturb: function () {
    this.setState({disturb: !this.state.disturb});
  },

  getButton: function () {
    let buttonClass = 'media-acceptor-button ' + (this.state.disturb && 'enabled' || 'disabled');
    let iconClass = 'fa fa-fw ' + (this.state.disturb && 'fa-bell-o' || 'fa-bell-slash-o');
    return (
      <button className={buttonClass} onClick={this.toggleDisturb}>
        <i className={iconClass}></i>
      </button>
    );
  },

  render: function () {
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
              <button className="primary" onClick={this.accept}><i className="fa fa-check"></i> Accept</button>
              <button onClick={this.popRequest}><i className="fa fa-times"></i> Go Away!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

});