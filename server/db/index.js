const mongoose = require('mongoose');

// Exercise schema
const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
});

const userSchema= new mongoose.Schema({
    name: String,
    saved_exercises: [{
        id: Number,
        name: String,
        type: String,
        muscle: String,
        equipment: String,
        difficulty: String,
        instructions: String
    }]
})

const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema)

module.exports = { Exercise, User };