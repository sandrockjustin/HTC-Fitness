import React, { useState } from 'react';
import { Grid2 } from '@mui/material';
import dayjs from 'dayjs';
import Chart from './Chart.jsx';
import WeightCard from './WeightCard.jsx';

const Goals = () => {
  // State to toggle input visibility
  const [showInputs, setShowInputs] = useState({
    goal: false,
    current: false,
  });
  // State to store user-input weights
  const [weights, setWeights] = useState({
    goalWeight: '',
    currentWeight: 250,
  });

  const handleButtonClick = (type) => {
    setShowInputs((prev) => ({ ...prev, [type]: true }));
  };

  const handleInputChange = (e, type) => {
    setWeights((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const handleCancel = (type) => {
    setShowInputs((prev) => ({ ...prev, [type === 'goalWeight' ? 'goal' : 'current']: false }));
  };

  const handleSubmit = (type) => {
    const weightType = type === 'goalWeight' ? 'Goal Weight' : 'Current Weight';
    alert(`${weightType} Set: ${weights[type]} lbs.`);
    setShowInputs((prev) => ({ ...prev, [type === 'goalWeight' ? 'goal' : 'current']: false })); // hide input field after submission
  };

  const handleAddDateWeight = (date, weight) => {
    const formattedDate = dayjs(date).format('MMMM D, YYYY');
    alert(`Added weight: ${weight} lbs. for ${formattedDate}`);
  };

  return (
    <div>
      <Grid2 container spacing={2} sx={{ mt: 3, justifyContent: 'center', alignItems: 'center' }}>
        {/* Goal Weight Card */}
        <WeightCard
          title="Goal Weight"
          weight={weights.goalWeight}
          showInput={showInputs.goal}
          onButtonClick={() => handleButtonClick('goal')}
          onInputChange={(e) => handleInputChange(e, 'goalWeight')}
          onSubmit={() => handleSubmit('goalWeight')}
          onCancel={() => handleCancel('goalWeight')}
          buttonText="Set Goal Weight"
          inputLabel="Goal Weight"
        />
        {/* Current Weight Card */}
        <WeightCard
          title="Current Weight"
          weight={weights.currentWeight}
          showInput={showInputs.current}
          onButtonClick={() => handleButtonClick('current')}
          onInputChange={(e) => handleInputChange(e, 'currentWeight')}
          onSubmit={() => handleSubmit('currentWeight')}
          onCancel={() => handleCancel('currentWeight')}
          buttonText="Set Current Weight"
          inputLabel="Current Weight"
          isCurrentWeightCard
          onAddDateWeight={handleAddDateWeight}
        />
      </Grid2>
      <Chart />
    </div>
  );
};

export default Goals;
