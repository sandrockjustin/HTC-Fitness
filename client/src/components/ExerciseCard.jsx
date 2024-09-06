import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInstructionToggle = () => {
    setShowInstructions((prevState) => !prevState);
  };

  const formatInstructions = (instructions) => instructions
    .split('. ')
    .map((sentence, index) => (
      <Typography key={index} variant="body1" color="#1976d2" sx={{ mb: 1 }}>
        {sentence}.
      </Typography>
    ));

  return (
    <Card sx={{
      height: '22rem',
      width: '20rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <CardContent sx={{
        overflowY: 'auto',
        flexGrow: 1,
        paddingRight: '1rem',
      }}>
        <Typography variant="h4" component="div">
          {exercise.name}
        </Typography>
        <Typography variant="subtitle1" color="orange">
          Muscle: {
            (exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.slice(1))
              .replace('_', ' ')
          }
        </Typography>
        {/* Only render Equipment and Diff when showInstructions is false */}
        {!showInstructions && (
          <Typography variant="body2" color="textSecondary">
            Equipment: {exercise.equipment.charAt(0).toUpperCase() + exercise.equipment.slice(1)}
          </Typography>
        )}
        {!showInstructions && (
          <Typography variant="body2" color="textSecondary">
            Difficulty: {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </Typography>
        )}
        {/* Only render instructions when showInstructions is true */}
        {showInstructions && (
          <div>
            Instructions: {formatInstructions(exercise.instructions)}
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={ handleInstructionToggle }>
          { showInstructions ? 'Show Less' : 'Learn More' }
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExerciseCard;
