import React from 'react';

export default React.createClass({
  propTypes: {
    index: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },

  statics: {
    isPollAnswer: function (answer) {
      return React.isValidElement(answer) && answer.type.displayName === 'PollAnswer';
    }
  },

  getId: function () {
    return this.props.name + '-' + this.props.index;
  },

  render: function () {
    return (
      <label for={this.getId()}>
        <input type="radio" id={this.getId()} name={this.props.name} />{this.props.children}
      </label>
    );
  }

});