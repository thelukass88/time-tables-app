import React from 'react';

function Quiz({ question, userAnswer, setUserAnswer, timeLeft }) {
  return (
    <div className="quiz">
      <p className="question-text">What is {question.num1} x {question.num2}?</p>
      <div className="timer">Time left: {timeLeft}s</div> {/* Display timer */}
      <input
        type="text"
        value={userAnswer}
        readOnly
        placeholder="Your answer"
      />
    </div>
  );
}

export default Quiz;

