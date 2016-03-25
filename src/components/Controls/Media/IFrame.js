import React from 'react';

export default React.createClass({
  propTypes: {
    link: React.PropTypes.string.isRequired
  },

  getSrc: function () {
    return 'http://www.youtube.com/embed/' + this.prop.videoId;
  },

  render: function () {
    return (
      <iframe allowfullscreen="allowfullscreen" src={this.getSrc()} width="100%" height="500px"></iframe>
    );
  }

});