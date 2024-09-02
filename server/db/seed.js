const mongoose = require('mongoose');
const { Exercise } = require('./index');

mongoose.connect('mongodb://localhost:27017/HTC-Fitness');

const exercises = [
  {
    name: 'Push Ups',
    type: 'basic',
    muscle: 'forearms',
    equipment: 'none',
    difficulty: 'beginner',
    instructions: 'Place both palms on the ground, straighten back and legs, lower your body with your shoulders and then push up with your arms.',
  },
  {
    name: 'Sprinting',
    type: 'basic',
    muscle: 'legs',
    equipment: 'shoes',
    difficulty: 'beginner',
    instructions: 'Run as fast as you can for 100 yards, rest for 20 seconds, repeat.',
  },
  {
    name: 'Sit ups',
    type: 'basic',
    muscle: 'abdominal',
    equipment: 'none',
    difficulty: 'beginner',
    instructions: 'Sit on the floor and lay back, place the soles of your feet on the ground with your knees bent. Then push your body up without using your arms so that your face becomes even with your knees. Then lay back and repeat.',
  },
];

Exercise.insertMany(exercises)
  .then(() => {
    console.log('Exercises inserted successfully!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting comics:', err);
    mongoose.connection.close();
  });
