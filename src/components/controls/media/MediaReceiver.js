import React from 'react';

import { Observable } from 'rxjs';

import Media from '../../Media';

let socket = require('../../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class MediaReceiver extends React.Component {
  static propTypes = {
    stateSubject: React.PropTypes.object.isRequired
  };

  componentDidMount () {
    this.setup();
  }

  componentWillReceiveProps () {
    this.tearDown();
    this.setup();
  }

  setup () {
    this.observable = Observable.fromEvent(socket, 'state/slide:add')
      .map(this.toStateEvent)
      .distinctUntilChanged()
      .subscribe((e) => this.props.stateSubject.next(e));
  }

  tearDown () {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  }

  toStateEvent (data) {
    return {
      ...data,
      type: 'state/slide:add',
      content: React.createElement(Media, {data: data.media})
    }
  }

  render () {
    return false
  }

}
