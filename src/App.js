import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Scoreboard from './components/Scoreboard';
import NumberPad from './components/NumberPad';

function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(6); // Timer state

  // Generate a new question
  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 * num2 };
  }

  // Handle answer submission
  function handleAnswer() {
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 1);
      alert("Correct!");
    } else {
      alert("Try again!");
    }
    setUserAnswer(''); // Clear the answer
    setQuestion(generateQuestion()); // Generate a new question
    setTimeLeft(6); // Reset the timer
  }

  // Handle number pad functions
  function handleNumberClick(number) {
    setUserAnswer(userAnswer + number); // Append the clicked number to the answer
  }

  function handleClear() {
    setUserAnswer(''); // Clear the answer field
  }

  function handleDelete() {
    setUserAnswer(userAnswer.slice(0, -1)); // Remove the last digit
  }

  // Timer effect
  useEffect(() => {
    // Reset the timer for a new question
    setTimeLeft(6);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(); // Automatically submit answer when time runs out
          return 0; // Prevent going below 0
        }
        return prev - 1; // Decrement timer
      });
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [question]); // Restart timer when question changes

  return (
    <div className="App">
      <h1>Times Tables Quiz</h1>
      <Scoreboard score={score} />
      <Quiz
        question={question}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        timeLeft={timeLeft} // Pass timeLeft to Quiz component
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

