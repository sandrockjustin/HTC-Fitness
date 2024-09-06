import React from 'react';
import { Grid2, Typography } from '@mui/material';
import ExerciseCard from './ExerciseCard.jsx';

const HomePage = ({ exercises }) => (
  <div>
    <Typography variant="h4" gutterBottom align="center">
    {'Welcome, <User>, to the Hyperbolic Time Chamber'}
    </Typography>
    {exercises.length > 0 ? (
        <Grid2 container spacing={2} alignItems="stretch" paddingLeft="6rem">
          {exercises.map((exercise, index) => (
            <Grid2 xs={12} sm={6} md={4} key={index}>
              <ExerciseCard exercise={ exercise }/>
            </Grid2>
          ))}
        </Grid2>
    ) : (
      <Typography variant="body1">
      No exercises found.
    </Typography>
    )}
  </div>
);

export default HomePage;
