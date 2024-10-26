import React, { useState, useEffect } from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import Quiz from './components/Quiz';
import NumberPad from './components/NumberPad';

function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);  // Array of selected numbers
  const [questions, setQuestions] = useState([]);              // Array of questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);

  const handleStartQuiz = (numbers) => {
    setSelectedNumbers(numbers);
  };

  // Generate 25 questions using random selected numbers
  useEffect(() => {
    if (selectedNumbers.length > 0) {
      const newQuestions = Array.from({ length: 25 }, () => {
        const num1 = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
        const num2 = Math.floor(Math.random() * 12) + 1;
        const isNum1 = Math.random() > 0.5;
        return {
          num1: isNum1 ? num1 : num2,
          num2: isNum1 ? num2 : num1,
          answer: num1 * num2,
        };
      });
      setQuestions(newQuestions);
    }
  }, [selectedNumbers]);

  function handleAnswer() {
    if (
      questions.length > 0 &&
      questions[currentQuestionIndex] &&
      parseInt(userAnswer) === questions[currentQuestionIndex].answer
    ) {
      setScore(score + 1);
    }

    setUserAnswer('');
    setTimeLeft(6);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  }

  useEffect(() => {
    if (selectedNumbers.length === 0 || showScore) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, selectedNumbers, showScore]);

  return (
    <div className="App">
      {selectedNumbers.length === 0 ? (
        <FrontPage onStartQuiz={handleStartQuiz} />
      ) : showScore ? (
        <div>
          <h1>Quiz Complete!</h1>
          <p>Your Score: {score} / 25</p>
        </div>
      ) : (
        questions.length > 0 && (
          <>
            <Quiz
              question={questions[currentQuestionIndex]}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              timeLeft={timeLeft}
              handleAnswer={handleAnswer}
            />
            <NumberPad 
              onNumberClick={(number) => setUserAnswer(userAnswer + number)} 
              onClear={() => setUserAnswer('')} 
              onDelete={() => setUserAnswer(userAnswer.slice(0, -1))} 
              handleAnswer={handleAnswer}
            />
          </>
        )
      )}
    </div>
  );
}

export default App;



