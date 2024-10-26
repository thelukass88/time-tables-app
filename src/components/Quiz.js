import React from 'react';

function Quiz({ question, userAnswer, setUserAnswer, timeLeft, handleAnswer }) {
  if (!question) return null; // If question is undefined, render nothing

  return (
    <div className="quiz">
      <p className="question-text">{question.num1} x {question.num2}=</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer"
      />
    </div>
  );
}

export default Quiz;


