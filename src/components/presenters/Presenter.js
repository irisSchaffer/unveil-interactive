import React from 'react';

import Voting from '../voting/Voting'

export default class Presenter extends React.Component {

  propTypes = {
    unveil: React.PropTypes.object.isRequired,
    controls: React.PropTypes.array.isRequired
  }

  controlsElements: function (groups) {
    if (!groups) {
      groups = Object.keys(this.props.controls)
    }

    const renderedControls = groups.reduce((controls, group) => {
      return controls.concat(this.props.controls[group])
    }, [])

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
    const slide = this.getSlide(this.props.unveil.routerState.indices)
    const hasVoting = React.Children.toArray(slide.props.children)
      .reduce((hasVoting, child) => (hasVoting || Voting.isVoting(child)), false)

    return (
      <div>
        {this.controlsElements(!hasVoting && ['navigation', 'other'] || ['navigation'])}
        {slide}
      </div>
    )
  }

});
