import React from 'react';
// @todo this should point to the unveil dependency
import { Utils, Notes } from '../../../../unveil.js/src';

export default class SpeakerPresenter extends React.Component {

  static propTypes = {
    unveil:   React.PropTypes.object.isRequired,
    controls: React.PropTypes.array.isRequired
  };

  static contextTypes = {
    slide: React.PropTypes.node.isRequired
  };

  getNotes (slide) {
    return slide.props.children.toList().filter(Notes.isNotes)
  }

  getNextSlide (level) {
    let directions = this.props.unveil.routerState.directions[level]
    if (!directions || !directions.next) {
      return
    }

    return this.props.unveil.getSlide(directions.next)
  }

  controlsElements () {
    let controls = this.props.controls.map( (control) => {
      const props = {
        key: control.displayName,
        navigator: this.props.unveil.navigator,
        stateSubject: this.props.unveil.stateSubject
      }
      return React.createElement(control, props)
    })

    return React.createElement('controls', null, controls)
  }


  render () {
    const slide = this.context.slide
    const slideRight = slide.props.right && this.props.unveil.getSlide(slide.props.right) || this.getNextSlide(0)
    const slideDown = slide.props.down && this.props.unveil.getSlide(slide.props.down) || this.getNextSlide(1)
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth)

    if (width > 768) {
      return (
        <div className="speaker-presenter desktop">
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

    return (
      <div className="speaker-presenter mobile">
        <div className="speaker-presenter-controls">
          {this.controlsElements()}
        </div>
        <div className="speaker-presenter-slide">
          {slide}
        </div>
        <div className="speaker-presenter-details">
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

}
