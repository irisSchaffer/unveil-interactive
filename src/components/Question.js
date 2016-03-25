import React from 'react';
import IFrame from './IFrame';

export default React.createClass({
  render: function () {
    return (
      <blockquote className="question">
        {this.props.children}
        <cite>On <a href={window.location}>{window.location}</a></cite>
      </blockquote>
    );
  }

});