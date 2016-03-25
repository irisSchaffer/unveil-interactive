import React from 'react';

export default React.createClass({
  propTypes: {
    link: React.PropTypes.string.isRequired
  },

  getYouTubeSrc: function (str) {
    return 'http://www.youtube.com/embed/' + str;
  },

  getYouTubeId: function (str) {
    var regExp = new RegExp(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    var match = str.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  },

  render: function () {
    let link = this.getYouTubeId(this.props.link);
    link = link && this.getYouTubeSrc(link) || this.props.link;

    return (
      <iframe allowFullScreen src={link} width="100%" height="100%"></iframe>
    );
  }

});