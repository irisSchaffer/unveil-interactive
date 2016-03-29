import React from 'react';

export default class Redirect extends React.Component {
  static contextTypes = {
    history:     React.PropTypes.object.isRequired,
    routerState: React.PropTypes.object.isRequired,
    slide:       React.PropTypes.node.isRequired
  };

  static propTypes = {
    target: React.PropTypes.string.isRequired,
    slide:  React.PropTypes.string.isRequired
  };

  componentWillMount () {
    this.redirect()
  }

  componentWillUpdate () {
    this.redirect()
  }

  redirect () {
    if (this.context.slide.key === this.props.slide) {
      this.context.history.replace({
        pathname: this.props.target,
        query:    this.context.routerState.query
      })
    }
  }

  render () {
    return false
  }

}
