import React from 'react';

export default React.createClass({
  propTypes: {
    counter: React.PropTypes.number.isRequired,
    total:   React.PropTypes.number.isRequired,
    title:   React.PropTypes.string.isRequired
  },

  render: function() {
    const { counter, total, title } = this.props
    let percentage = 100 * (counter / total) || 0

    console.log(counter, total, counter/total)

    const className = 'result-bar-percentage' + (percentage >= 100 && ' full' || '')
    return (
      <div className="result">
        <h2>{title} ({Number(percentage).toFixed(2)}%)</h2>
        <div className="result-bar">
          <span className={className} style={{width: percentage + '%'}}></span>
        </div>
      </div>
    )
  }

});
