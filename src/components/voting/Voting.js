import React from 'react';

import Answer   from './Answer';
import Question from './Question';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  render: function() {
    const { name, children } = this.props

    return (
      <div className="voting">
        <form>
          {children
            .filter(child => Question.isQuestion(child))
            .map((question) => {
              console.log(question)
              return (
                <Question {...question.props} />
              )
            }
          )}

          <ul>
          {children
            .filter((child) => Answer.isAnswer(child))
            .map((answer) => {
              console.log(answer)
              return (
                <li>
                  <Answer {...answer.props} key={answer.props.value} name={name} onChange={function(){alert(test)}} />
                </li>
              )
            }
          )}
          </ul>

          <button type="submit" ref="votingButton">Vote</button>
        </form>
      </div>
    )
  }

});
