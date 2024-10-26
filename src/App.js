import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Scoreboard from './components/Scoreboard';

function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');

  // Generates a random times table question
  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 * num2 };
  }

  // Handles the answer submission
  function handleAnswer() {
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 1);
      alert("Correct!");
    } else {
      alert("Try again!");
    }
    setQuestion(generateQuestion());
    setUserAnswer('');
  }

  return (
    <div className="App">
      <h1>Times Tables Quiz</h1>
      <Scoreboard score={score} />
      <Quiz
        question={question}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}

export default App;
