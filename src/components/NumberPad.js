import React from 'react';

function NumberPad({ onNumberClick, onClear, onDelete, handleAnswer }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="number-pad">
      <div className="number-buttons">
        {numbers.map((number) => (
          <button key={number} onClick={() => onNumberClick(number)}>
            {number}
          </button>
        ))}
        <button onClick={handleAnswer}>Submit Answer</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default NumberPad;

