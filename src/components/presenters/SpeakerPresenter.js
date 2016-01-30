import React   from 'react';
// @todo this should point to the unveil dependency
import {Utils, Notes} from '../../../../unveil-fork/src';

export default React.createClass({

  propTypes: {
    unveil: React.PropTypes.object.isRequired,
    controls: React.PropTypes.array.isRequired
  },

  getSlide: function (indices) {
    let slide = this.props.unveil.slides.toList()[indices[0]];
    if(indices.length > 1 )
      return slide.props.children.toList()[indices[1]];
    else
      return slide
  },

  getNotes: function (slide) {
    return slide.props.children.filter(Notes.isNotes);
  },

  controlsElements: function () {
    let controls = this.props.controls.map( (control) => {
      const props = {
        key: control.displayName,
        navigator: this.props.unveil.navigator,
        stateSubject: this.props.unveil.stateSubject
      };
      return React.createElement(control, props);
    });

    return React.createElement('controls', null, controls);
  },


  render: function () {
    let slide = this.getSlide(this.props.unveil.routerState.indices);
    return (
      <div className="speaker-presenter">
        <div className="speaker-presenter-slide">
          {slide}
        </div>
        <div className="speaker-presenter-details">
          <div className="speaker-presenter-next-slide">
          </div>
          <div className="speaker-presenter-controls">
            {this.controlsElements()}
          </div>
        </div>
        <div className="speaker-presenter-notes">
          {this.getNotes(slide)}
        </div>
      </div>
    )
  }

});