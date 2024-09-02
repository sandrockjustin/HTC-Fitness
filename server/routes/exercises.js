const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_URL = 'https://api.api-ninjas.com/v1/exercises';

router.get('/test', (req, res) => {
  res.status(200).send('Test route is working!');
});

// Route to fetch exercises
router.get('/', async (req, res) => {
  try {
    // Fetch data from API Ninjas
    const response = await axios.get(API_URL, {
      headers: {
        'X-Api-Key': `${process.env.API_KEY}`,
      },
    });

    const exercises = response.data;

    res.status(200).send(exercises);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).send('Error fetching data from API.');
  }
});

module.exports = router;
