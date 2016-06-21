import React from 'react';

import { Observable } from 'rxjs';

let socket = require('../../../../unveil-network-sync/src/helpers/SocketIO').default;

export default class InitialStateListener extends React.Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  }

  setup () {
    this.observable = Observable.fromEvent(socket, 'state:initial')
      .subscribe(this.props.navigator.next)
  }

  tearDown () {
    if (this.observable) {
      this.observable.unsubscribe()
    }
  }

  componentDidMount () {
    this.setup()
  }

  render () {
    return (false)
  }

}
