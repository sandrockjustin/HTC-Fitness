const express = require('express');
const path = require('path')
const mongoose = require('mongoose');

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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'))
})

app.listen(PORT, () => {
    console.info(`Server listening at http://127.0.0.1:${PORT}`)
});
