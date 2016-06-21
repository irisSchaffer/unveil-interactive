import React from 'react';

export default class Answer extends React.Component {
  static propTypes = {
    value:    React.PropTypes.string.isRequired,
    name:     React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    children: React.PropTypes.string.isRequired
  };

  static isAnswer (e) {
    return React.isValidElement(e) && e.type.name === 'Answer'
  };

  getAnswerId (answer) {
    return 'voting-' + this.props.votingName + '-answer-' + this.props.name
  }

  render () {
    const { value, name, children, onChange } = this.props

    return (
      <label for={this.getAnswerId()}>
        <input type="radio" name={name} value={value} id={this.getAnswerId()} onChange={onChange}/>
        {children}
      </label>
    )
  }

}
