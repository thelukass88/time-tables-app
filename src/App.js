import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Quiz from './components/Quiz';
// import Scoreboard from './components/Scoreboard';
import NumberPad from './components/NumberPad';
import NumberSelection from './components/NumberSelection'; // Make sure to import this

function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(null); // Start as null
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [showScore, setShowScore] = useState(false);

  const generateQuestion = useCallback(() => {
    if (selectedNumbers.length === 0) return null; // Ensure there's a number to use
  
    const selectedNum = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
    const randomNum = Math.floor(Math.random() * 12) + 1; // Questions up to 12
  
    // Randomly assign `selectedNum` as either `num1` or `num2`
    const [num1, num2] = Math.random() > 0.5 ? [selectedNum, randomNum] : [randomNum, selectedNum];
  
    return { num1, num2, answer: num1 * num2 };
  }, [selectedNumbers]);

  const handleAnswer = useCallback(() => {
    // Check if user answer is correct
    if (question && parseInt(userAnswer) === question.answer) {
      setScore(prevScore => prevScore + 1);
    }

    setUserAnswer('');
    setTimeLeft(6); // Reset time for next question

    if (currentQuestionIndex < 24) { // Assuming you want 25 questions (0-24)
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setQuestion(generateQuestion());
    } else {
      setShowScore(true); // Show score at the end
    }
  }, [question, userAnswer, currentQuestionIndex, generateQuestion]);

  useEffect(() => {
    if (showScore) return; // Don't start timer if showing score

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(); // Call handleAnswer when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [timeLeft, showScore, handleAnswer]);

  useEffect(() => {
    // Only generate the first question if selectedNumbers are set
    if (selectedNumbers.length > 0) {
      setQuestion(generateQuestion()); // Generate the first question after numbers are selected
    }
  }, [selectedNumbers, generateQuestion]);

  // Function to start the quiz by setting selected numbers
  const startQuiz = (numbers) => {
    setSelectedNumbers(numbers);
    setScore(0); // Reset score to 0
    setCurrentQuestionIndex(0);
    setShowScore(false); // Hide score initially
    setTimeLeft(6);
    setUserAnswer('');
  };

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
      {showScore ? (
        <div>
          <h2>Your Final Score: {score} out of 25</h2> {/* Show final score only here */}
        </div>
      ) : selectedNumbers.length === 0 ? (
        <NumberSelection onStart={startQuiz} /> // Show selection component if no numbers selected
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





