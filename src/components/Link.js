import React from 'react';

export default class Link extends React.Component {
  static contextTypes = {
    mode: React.PropTypes.string.isRequired,
  };

  static propTypes = {
    target: React.PropTypes.string
  };

  getUrl () {
    return '/#' + this.props.target + (this.context.mode && `?mode=${this.context.mode}` || '')
  }

  render () {
    return <a href={this.getUrl()}>{this.props.children}</a>
  }

}
