import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Scoreboard from './components/Scoreboard';
import NumberPad from './components/NumberPad';

function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 * num2 };
  }

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

  // Number pad functions
  function handleNumberClick(number) {
    setUserAnswer(userAnswer + number); // Append the clicked number to the answer
  }

  function handleClear() {
    setUserAnswer(''); // Clear the answer field
  }

  function handleDelete() {
    setUserAnswer(userAnswer.slice(0, -1)); // Remove the last digit
  }

  return (
    <div className="App">
      <h1>Times Tables Quiz</h1>
      <Scoreboard score={score} />
      <Quiz
        question={question}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
      />
      <NumberPad 
        onNumberClick={handleNumberClick} 
        onClear={handleClear} 
        onDelete={handleDelete} 
        handleAnswer={handleAnswer}
      />
    </div>
  );
}

export default App;

