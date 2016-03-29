import React from 'react';

export default class Voting extends React.Component {
  static contextTypes = {
    history: React.PropTypes.object.isRequired
  };

  static propTypes = {
    target: React.PropTypes.string
  };

  componentWillMount() {
    this.context.history.replace(this.props.target)
    location.reload()
  }

  render () {
    return false
  }

}
