import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <legend>{this.props.children}</legend>
    );
  }

});