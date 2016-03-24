import React from 'react';
// @todo this should point to the unveil dependency
import {Utils, Notes} from '../../../../unveil.js/src';

export default React.createClass({

  propTypes: {
    unveil:   React.PropTypes.object.isRequired,
    controls: React.PropTypes.array.isRequired
  },

  contextTypes: {
    slide: React.PropTypes.node.isRequired
  },

  getNotes: function (slide) {
    return slide.props.children.toList().filter(Notes.isNotes);
  },

  getNextSlide: function (level) {
    let directions = this.props.unveil.routerState.directions[level];
    if (!directions || !directions.next) {
      return;
    }

    return this.props.unveil.getSlide(directions.next);
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
    let slide = this.context.slide;
    let slideRight = this.getNextSlide(0);
    let slideDown = this.getNextSlide(1);
    return (
      <div className="speaker-presenter">
        <div className="speaker-presenter-slide">
          {slide}
        </div>
        <div className="speaker-presenter-details">
          <div className="speaker-presenter-controls">
            {this.controlsElements()}
          </div>
          <div className="speaker-presenter-slide-right">
            {slideRight}
          </div>
          <div className="speaker-presenter-slide-down">
            {slideDown}
          </div>
        </div>
        <div className="speaker-presenter-notes">
          {this.getNotes(slide)}
        </div>
      </div>
    )
  }

});
