import React from 'react';

function Quiz({ question, userAnswer }) {
  return (
    <div className='quiz'>
      <p>{question.num1} x {question.num2}=</p>
      <input
        className='answer'
        type="text"
        value={userAnswer}
        readOnly // Prevents typing directly, allowing only number pad input
        placeholder="Your answer"
      />
    </div>
  );
}

export default Quiz;

