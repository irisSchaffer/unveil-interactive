import React from 'react';
import IFrame from './IFrame';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  componentDidMount: function () {
    this.props.children = this.props.children.toList()
      .map((a, i) => {
        return React.cloneElement(
          a, { index: i, name: this.props.name }
        );
      });
  },

  toRadioButton: function (answer, index) {
    let id = name + '-' + index;
    let radio = React.createElement(
      'input',
      {type: 'radio', name: this.state.name, value: index, id: id}
    );
    return React.createElement('label', {for: id}, radio);
  },

  render: function () {
    return (
      <form className="poll">
        {this.props.children}
      </form>
    );
  }

});