import React from 'react';

import { Observable, Subject } from 'rxjs';
import IFrame from '../../IFrame';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default React.createClass({
  getInitialState: function () {
    return {sharingMode: false};
  },

  setup: function () {
    this.subject = this.subject || new Subject();

    this.subject
      .map((content) => ({
        content: content,
        location: window.location.href
      }))
      .subscribe((data) => {
        socket.emit('state/slide/add:accept', data);
      });
  },

  tearDown: function () {
    if (this.subject) {
      this.subject.dispose();
    }
  },

  componentDidMount: function () {
    this.setup();
  },

  //componentWillReceiveProps: function () {
  //  this.tearDown();
  //  this.setup();
  //},

  share: function () {
    this.subject.next(this.refs.textarea.value);
    this.refs.textarea.value = '';
    this.toggleSharingMode();
  },

  toggleSharingMode: function (event) {
    this.setState({sharingMode: !this.state.sharingMode});
  },

  render: function () {
    if (!this.state.sharingMode) return (
      <div className="media-sender">
        <button onClick={this.toggleSharingMode}>
          <i className="fa fa-share-alt"></i> Share
        </button>
      </div>
    );
    else return (
      <div className="modal media-sender">
        <div className="modal-content">
          <h2>Share</h2>
          <p>Ask a question or share related links to articles, videos, images...</p>
          <textarea ref="textarea" />
          <div className="modal-buttons">
            <button onClick={this.share}><i className="fa fa-share-alt"></i> Share</button>
            <button onClick={this.toggleSharingMode}><i className="fa fa-times"></i> Close</button>
          </div>
        </div>
      </div>
    );
  }

});