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
      .map(this.addMethod('after'))
      .subscribe(this.setRequest);

    this.appendObservable = Observable.fromEvent(socket, 'state/slide/add:accept')
      .filter((e) => !this.state.disturb)
      .map(this.addMethod('append'))
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
    this.subject.next(this.state.request);
    this.resetRequest();
  },

  getInitialState: function () {
    return {disturb: true, request: null};
  },

  resetRequest: function () {
    this.setState({request: null});
  },

  setRequest: function (request) {
    this.setState({request: request});
  },

  addMethod: function (method) {
    return function (media) {
      return {method: method, media: media}
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
    if (!this.state.request) {
      return this.getButton();
    }

    return (
      <div>
        {this.getButton()}
        <div className="modal media-acceptor">
          <div className="modal-content">
            <h2>Incoming Request</h2>
            <div className="media-acceptor-request">
              {React.createElement(Media, {data: this.state.request.media})}
            </div>
            <div className="modal-buttons">
              <button onClick={this.accept}><i className="fa fa-check"></i> Accept</button>
              <button onClick={this.resetRequest}><i className="fa fa-times"></i> Go Away!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

});