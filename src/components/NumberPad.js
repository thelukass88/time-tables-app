import React from 'react';

function NumberPad({ onNumberClick, onClear, onDelete, handleAnswer }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="number-pad">
      <div className="number-buttons">
        {numbers.map((number) => (
          <button key={number} onClick={() => onNumberClick(number)}>
            {number}
          </button>
        ))}
        <button onClick={onDelete} className="delete-button">Delete</button>
        <button key={0} onClick={() => onNumberClick(0)}>0</button>
        <button onClick={handleAnswer} className="enter-button">Enter</button>
      </div>
    </div>
  );
}

export default NumberPad;

