import React from 'react';

import { Observable } from 'rxjs';

let socket = require('../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default React.createClass({
  propTypes: {
    navigator: React.PropTypes.object.isRequired
  },

  setup: function () {
    this.observable = Observable.fromEvent(socket, 'state:initial')
      .subscribe(this.props.navigator.next);
  },

  tearDown: function () {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  },

  componentDidMount: function () {
    this.setup();
  },

  render: function () {
    return (false);
  }

});
