import React from 'react';

import { Observable } from 'rxjs';

import Media from '../../Media';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default React.createClass({
  propTypes: {
    stateSubject: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.setup();
  },

  componentWillReceiveProps: function () {
    this.tearDown();
    this.setup();
  },

  setup: function () {
    this.observable = Observable.fromEvent(socket, 'state/slide:add')
      .map(this.toStateEvent)
      .distinctUntilChanged()
      .subscribe((e) => this.props.stateSubject.next(e));
  },

  tearDown: function () {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  },

  toStateEvent: function (data) {
    return {
      type: 'state/slide:add',
      content: React.createElement(Media, {data: data.media}),
      method: data.method
    };
  },

  render: function () {
    return false;
  }

});