const express = require('express');
const { User } = require('../db/index');

const router = express.Router();

// function to add badge
const addBadge = async (user, badge) => {
  try {
    const existingUser = await User.findOne({ googleId: user.googleId });
    if (!existingUser) {
      console.error('Failed to find user');
    }

    existingUser.badges.push(badge);
    await existingUser.save();
    console.log('Badge added to user');
  } catch (err) {
    console.error('Failed to add badge');
    throw err;
  }
};

// handler to add badge
router.post('/addBadge', async (req, res) => {
  const { badge, user } = req.body;
  try {
    await addBadge(user, badge);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

// handler to check if user needs a badge
router.get('/badgeCheck', async (req, res) => {
  const { user } = req;
  const { badges, saved_exercises, completedExercises } = user;
  const badgeNames = badges.map((badge) => badge.name);

  try {
    // check if user has a new user badge
    if (!badgeNames.includes('New User')) {
      await addBadge(user, {
        name: 'New User',
        description: 'User account is created',
        earnedAt: new Date(),
        icon: 'mdiFaceManShimmer',
      });
    }
    // check if user has a fitness master badge
    if (completedExercises >= 10 && !badgeNames.includes('Fitness Master')) {
      await addBadge(user, {
        name: 'Fitness Master',
        description: 'User has completed 10 exercises',
        earnedAt: new Date(),
        icon: 'mdiWeightLifter',
      });
    }
    if (completedExercises >= 20 && !badgeNames.includes('Fitness God')) {
      await addBadge(user, {
        name: 'Fitness Master',
        description: 'User has completed 10 exercises',
        earnedAt: new Date(),
        icon: 'mdiWeightLifter',
      });
    }
    // check if user has an exercise saver badge
    if (saved_exercises.length >= 10 && !badgeNames.includes('Exercise Saver')) {
      await addBadge(user, {
        name: 'Exercise Saver',
        description: 'User has saved 10 exercises',
        earnedAt: new Date(),
        icon: 'mdiPacMan',
      });
    }
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;

// User.find({ googleId: req.user.googleId })
//     .then((foundUser) => {
//       if (!foundUser) {
//         res.sendStatus(404);
//       } else {
//         User.findOneAndUpdate(
//           { googleId: req.user.googleId },
//           { $push: { badges: badge } },
//           { new: true },
//         )
//           .then((updatedUser) => {
//             console.log('updatedUser', updatedUser);
//             res.status(200).send(updatedUser);
//           })
//           .catch((err) => {
//             console.error(err);
//             res.sendStatus(500);
//           });
//       }
//     })