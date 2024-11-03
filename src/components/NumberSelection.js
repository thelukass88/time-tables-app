import React, { useState } from 'react';

const NumberSelection = ({ onStart }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [squareNumbersSelected, setSquareNumbersSelected] = useState(false);

  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleSquareNumbersToggle = () => {
    setSquareNumbersSelected(!squareNumbersSelected);
  };

  const handleStart = () => {
    if (selectedNumbers.length > 0 || squareNumbersSelected) {
      onStart(selectedNumbers, squareNumbersSelected);
    } else {
      alert('Please select at least one number or enable square numbers!');
    }
  };

  return (
    <div className="number-selection-container">
      <h2>Select Times Table Numbers (2 to 12)</h2>
      <div className="number-selection">
        {[...Array(11)].map((_, index) => {
          const number = index + 2;
          return (
            <button
              key={number}
              onClick={() => toggleNumber(number)}
              className={selectedNumbers.includes(number) ? 'selected' : ''}
            >
              {number}
            </button>
          );
        })}
      </div>
      <div className="square-numbers-container">
        <div className="square-numbers-wrapper">
          <input
            type="checkbox"
            checked={squareNumbersSelected}
            onChange={handleSquareNumbersToggle}
            id="includeSquares"
          />
          <label htmlFor="includeSquares">Include Square Numbers (2×2 to 12×12)</label>
        </div>
      </div>
      <button onClick={handleStart} className="start-quiz-button">
        Start Quiz
      </button>
    </div>
  );
};

export default NumberSelection;



