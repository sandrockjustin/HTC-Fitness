import React from 'react';

const HomePage = ({ exercises }) => (
  <div>
    <h1>Home Page</h1>
    {exercises.length > 0 ? (
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index}>
              <h2>{exercise.name}</h2>
              <p>Muscle: {exercise.muscle}</p>
              <p>Equipment: {exercise.equipment}</p>
              <p>Difficulty: {exercise.difficulty}</p>
              <p>Instructions: {exercise.instructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises found.</p>
      )}
  </div>
);

export default HomePage;
