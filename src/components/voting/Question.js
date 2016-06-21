import React from 'react';

export default class Question extends React.Component {

  static isQuestion (e) {
    return React.isValidElement(e) && e.type.name === 'Question'
  };

  render () {
    return (
      <h2>{this.props.children}</h2>
    )
  }

}
