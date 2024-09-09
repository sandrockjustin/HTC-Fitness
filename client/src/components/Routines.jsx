import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Card, CardContent } from '@mui/material';

const Routines = ({ savedExercises }) => {
  const [routineDetails, setRoutineDetails] = useState(
    savedExercises.map((exercise) => ({
      name: exercise.name,
      reps: '',
      sets: '',
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updatedRoutineDetails = [...routineDetails];
    updatedRoutineDetails[index][field] = value;
    setRoutineDetails(updatedRoutineDetails);
  };

  const handleSubmit = () => {
    console.log('Routine saved:', routineDetails);
    // Logic to save the routine goes here
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Your Routine
      </Typography>
      <Grid container spacing={2}>
        {routineDetails.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{exercise.name}</Typography>
                <TextField
                  label="Reps"
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Sets"
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => handleInputChange(index, 'sets', e.target.value)}
                  fullWidth
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 3 }}>
        Save Routine
      </Button>
    </div>
  );
};

export default Routines;
