import React from 'react';

export default React.createClass({

  statics: {
    isQuestion: function(e) {
      return React.isValidElement(e) && e.type.displayName === 'Question'
    }
  },

  render: function() {
    return (
      <h2>{this.props.children}</h2>
    )
  }

});
