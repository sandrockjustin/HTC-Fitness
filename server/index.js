const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exercisesRouter = require('./routes/exercises');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '../dist/client');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/HTC-Fitness')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(express.json());
app.use(express.static(DIST_DIR));
app.use('/api/exercises', exercisesRouter);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.info(`Server listening at http://127.0.0.1:${PORT}`);
});
