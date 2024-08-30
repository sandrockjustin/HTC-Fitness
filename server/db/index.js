const mongoose = require('mongoose');

// Exercise schema
const exerciseSchema = new mongoose.Schema({
    name: String,
    muscle: String,
    equipment: String,
    difficulty: String,
    instructions: String,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = { Exercise };