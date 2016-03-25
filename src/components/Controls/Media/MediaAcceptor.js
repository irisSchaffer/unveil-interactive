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
    this.acceptSubject = this.acceptSubject || new Subject();
    this.denySubject = this.denySubject || new Subject();

    this.denyObservable = Observable.fromEvent(socket, 'state/slide/add:deny')
      .subscribe(this.resetRequest);
    this.addObservable = Observable.fromEvent(socket, 'state/slide:add')
      .subscribe(this.resetRequest);

    this.afterObservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => this.state.disturb)
      .map(this.addMethod('under'))
<<<<<<< Updated upstream
      .subscribe(this.addRequest);

    this.appendObservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => !this.state.disturb)
      .map(this.addMethod('under'))
      .subscribe((e) => this.subject.next(e));
=======
      .subscribe(this.setRequest);

    this.appendObservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => !this.state.disturb)
      .map(this.addMethod('after'))
      .subscribe((e) => this.acceptSubject.next(e));
>>>>>>> Stashed changes

    this.acceptSubscription = this.acceptSubject
      .subscribe((media) => socket.emit('state/slide:add', media));

    this.denySubscription = this.denySubject
      .subscribe((request) => socket.emit('state/slide/add:deny', request));
  },

  unsubscribe: function (observable) {
    if (observable) {
      observable.unsubscribe();
    }
  },

  tearDown: function () {
    this.unsubscribe(this.afterObservable)
    this.unsubscribe(this.appendObservable);

    this.unsubscribe(this.denyObservable);
    this.unsubscribe(this.addObservable);

    this.unsubscribe(this.acceptSubscription);
    this.unsubscribe(this.denySubscription);
  },

  accept: function () {
<<<<<<< Updated upstream
    this.subject.next(this.popRequest());
=======
    this.acceptSubject.next(this.state.request);
    this.resetRequest();
  },

  deny: function () {
    this.denySubject.next(this.state.request);
    this.resetRequest();
>>>>>>> Stashed changes
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

  getButton: function (data) {
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
              <button onClick={this.accept}><i className="fa fa-check"></i> Accept</button>
<<<<<<< Updated upstream
              <button onClick={this.popRequest}><i className="fa fa-times"></i> Go Away!</button>
=======
              <button onClick={this.deny}><i className="fa fa-times"></i> Go Away!</button>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      </div>
    );
  }

});
