import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

const Routines = ({ savedExercises, userId }) => {
  const [routineData, setRoutineData] = useState(
    savedExercises.map((exercise) => ({
      ...exercise,
      sets: exercise.sets || null,
      reps: exercise.reps || null,
    }))
  );

  const handleChange = (index, field, value) => {
    const updatedData = [...routineData];
    updatedData[index][field] = value;
    setRoutineData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(`/api/users/${userId}/saved-exercises`, {
        exercises: routineData,
      });
      alert('Routine updated successfully!');
    } catch (error) {
      console.error('Error updating routine:', error);
      alert('Failed to update routine.');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        My Workout Routine
      </Typography>
      <Grid container spacing={2} justify="center">
        {routineData.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={exercise._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5">{exercise.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Muscle: ${exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.slice(1)}`}
                </Typography>
                <TextField
                  type="number"
                  label="Sets"
                  value={exercise.sets || ''}
                  onChange={(e) => handleChange(index, 'sets', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="number"
                  label="Reps"
                  value={exercise.reps || ''}
                  onChange={(e) => handleChange(index, 'reps', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }}>
        Save Routine
      </Button>
    </div>
  );
};

export default Routines;
