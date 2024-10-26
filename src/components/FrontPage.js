// FrontPage.js
import React, { useState } from 'react';

function FrontPage({ onStartQuiz }) {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const toggleNumberSelection = (number) => {
    setSelectedNumbers(prev =>
      prev.includes(number)
        ? prev.filter(n => n !== number) // Deselect if already selected
        : [...prev, number]               // Select if not already selected
    );
  };

  const handleStartQuiz = () => {
    if (selectedNumbers.length > 0) {
      onStartQuiz(selectedNumbers);
    } else {
      alert("Please select at least one number to start the quiz.");
    }
  };

  return (
    <div className="front-page">
      <h2>Select Times Tables</h2>
      <div className="number-selection">
        {[...Array(11).keys()].map(i => {
          const number = i + 2; // Generate numbers from 2 to 12
          return (
            <button
              key={number}
              onClick={() => toggleNumberSelection(number)}
              className={selectedNumbers.includes(number) ? 'selected' : ''}
            >
              {number}
            </button>
          );
        })}
      </div>
      <button onClick={handleStartQuiz} className="start-button">
        Start Quiz
      </button>
    </div>
  );
}

export default FrontPage;

