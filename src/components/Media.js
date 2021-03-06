import React from 'react';
import IFrame from './IFrame';

export default class Media extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  };

  isUrl (str) {
    let urlRegex = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)
    return urlRegex.test(str)
  }

  isDataString (str) {
    let dataUrlRegex = new RegExp(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i)
    return dataUrlRegex.test(str)
  }

  isImg (str) {
    let imgRegex = new RegExp(/(image\/(jpe?g|png|gif|bpm))|(\.(jpe?g|png|gif|bmp)$)/i)
    return imgRegex.test(str)
  }

  getElement (data) {
    if (this.isUrl(data) || this.isDataString(data)) {
      if (this.isImg(data)) {
        return React.createElement('img', {src: data})
      } else {
        return React.createElement(IFrame, {link: data})
      }
    } else {
      return React.createElement('blockquote', {}, data)
    }
  }

  render () {
    //console.log(this.props.data);
    // <cite>From <a href={this.props.data.location}>{this.props.data.location}</a></cite>
    return (
      <div>
        {this.getElement(this.props.data.content)}
      </div>
    )
  }

}
