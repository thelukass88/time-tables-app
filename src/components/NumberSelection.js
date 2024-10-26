// src/components/NumberSelection.js
import React, { useState } from 'react';

const NumberSelection = ({ onStart }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleStart = () => {
    if (selectedNumbers.length > 0) {
      onStart(selectedNumbers);
    } else {
      alert('Please select at least one number!');
    }
  };

  return (
    <div>
      <h2>Select Times Table Numbers (2 to 12)</h2>
      <div className="number-selection">
        {[...Array(11)].map((_, index) => {
          const number = index + 2; // Create numbers from 2 to 12
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
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
};

export default NumberSelection;

