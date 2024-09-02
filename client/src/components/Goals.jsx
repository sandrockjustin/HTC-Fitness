import React, { useState } from 'react';

const Goals = () => {
  // State to toggle input visibility
  const [showInput, setShowInput] = useState(false);
  // State to store user-input goal weight
  const [goalWeight, setGoalWeight] = useState('');

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setGoalWeight(e.target.value);
  };
  const handleSubmit = () => {
    // eslint-disable-next-line no-undef
    alert(`Goal Weight Set: ${goalWeight} lbs.`);
    setShowInput(false); // hide input field after submission
  };

  return (
    <div>
      <h1>{goalWeight ? `Current Goal: ${goalWeight} lbs.` : 'Add a Goal'}</h1>
      {!showInput ? (
        <button onClick={handleButtonClick}>Set Goal Weight</button>
      ) : (
        <div>
          <input
            type="number"
            placeholder="Goal Weight"
            value={goalWeight}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Add Weight</button>
        </div>
      )}
    </div>
  );
};

export default Goals;
