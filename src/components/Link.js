import React from 'react';

export default class Link extends React.Component {
  static contextTypes = {
    routerState: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    target: React.PropTypes.string
  };

  getUrl () {
    return '/#' + this.props.target + (this.context.routerState.query.mode && `?mode=${this.context.routerState.query.mode}` || '')
  }

  render () {
    return <a href={this.getUrl()}>{this.props.children}</a>
  }

}
