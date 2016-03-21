import React from 'react';

export default React.createClass({
  propTypes: {
    value:    React.PropTypes.string.isRequired,
    name:     React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    children: React.PropTypes.string.isRequired
  },

  statics: {
    isAnswer: function(e) {
      return React.isValidElement(e) && e.type.displayName === 'Answer'
    }
  },

  getAnswerId: function(answer) {
    return 'voting-' + this.props.votingName + '-answer-' + this.props.name
  },

  render: function() {
    const { value, name, children, onChange } = this.props

    return (
      <label for={this.getAnswerId()}>
        <input type="radio" name={name} value={value} id={this.getAnswerId()} onChange={onChange}/>
        {children}
      </label>
    )
  }

});
