const express = require('express');
const axios = require('axios');
const Exercise = require('../db/index.js');
const API_KEY = require('../config.js')

const router = express.Router();

const API_URL = 'https://api.api-ninjas.com/v1/exercises';

router.get('/test', (req, res) => {
  res.status(200).send('Test route is working!');
});

// Route to fetch exercises and save to database
router.get('/exercises', async (req, res) => {
  console.log('Router', this)
  try {
    // Fetch data from API Ninjas
    const response = await axios.get(API_URL, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    const exercises = response.data;

    // Save each exercise to MongoDB
    for (let exercise of exercises) {
      const newExercise = new Exercise({
        name: exercise.name,
        muscle: exercise.muscle,
        equipment: exercise.equipment,
        difficulty: exercise.difficulty,
        instructions: exercise.instructions,
      });

      await newExercise.save();
    }

    res.status(200).send('Exercises successfully added to the database.');
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).send('Error fetching data from API.');
  }
});

module.exports = router;
