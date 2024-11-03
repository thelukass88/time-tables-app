import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import NumberPad from './components/NumberPad';
import NumberSelection from './components/NumberSelection';

function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [squareNumbersSelected, setSquareNumbersSelected] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [showScore, setShowScore] = useState(false);

  const generateQuestion = useCallback(() => {
    if (selectedNumbers.length === 0 && !squareNumbersSelected) return null;

    if (squareNumbersSelected && Math.random() < 0.5) {
      const num = Math.floor(Math.random() * 11) + 2; // Pick a random number from 2 to 12
      return { num1: num, num2: num, answer: num * num };
    } else {
      const selectedNum = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
      const rangeLimit = selectedNum >= 11 ? 12 : 10;
      const randomNum = Math.floor(Math.random() * rangeLimit) + 1;
      const [num1, num2] = Math.random() > 0.5 ? [selectedNum, randomNum] : [randomNum, selectedNum];
      return { num1, num2, answer: num1 * num2 };
    }
  }, [selectedNumbers, squareNumbersSelected]);

  const handleAnswer = useCallback(() => {
    if (question && parseInt(userAnswer) === question.answer) {
      setScore(prevScore => prevScore + 1);
    }
    setUserAnswer('');
    setTimeLeft(6);
    if (currentQuestionIndex < 24) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setQuestion(generateQuestion());
    } else {
      setShowScore(true);
    }
  }, [question, userAnswer, currentQuestionIndex, generateQuestion]);

  useEffect(() => {
    if (showScore) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showScore, handleAnswer]);

  useEffect(() => {
    if (selectedNumbers.length > 0 || squareNumbersSelected) {
      setQuestion(generateQuestion());
    }
  }, [selectedNumbers, squareNumbersSelected, generateQuestion]);

  const startQuiz = (numbers, squaresSelected) => {
    setSelectedNumbers(numbers);
    setSquareNumbersSelected(squaresSelected);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setTimeLeft(6);
    setUserAnswer('');
  };

  function handleNumberClick(number) {
    setUserAnswer(userAnswer + number);
  }

  function handleClear() {
    setUserAnswer('');
  }

  function handleDelete() {
    setUserAnswer(userAnswer.slice(0, -1));
  }

  return (
    <div className="App">
      <h1>Times Tables Quiz</h1>
      {showScore ? (
        <div>
          <h2>Your Final Score: {score} out of 25</h2>
        </div>
      ) : selectedNumbers.length === 0 && !squareNumbersSelected ? (
        <NumberSelection onStart={startQuiz} />
      ) : (
        <>
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
          <div>Time Left: {timeLeft}</div>
        </>
      )}
    </div>
  );
}

export default App;






