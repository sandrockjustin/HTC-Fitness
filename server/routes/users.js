const express = require('express');
const router = express.Router();
const { User } = require('../db/index');

router.get('/', (req, res) => {
    User.find({})
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            console.error('Error finding user', err)
        })
})

router.post('/:userId', async (req, res) => {
    //console.log('Request Body', req.body, 'Request Params', req.params)
    const { userId } = req.params;
    const { exercise } = req.body;
    
    User.findByIdAndUpdate(userId, {saved_exercises: exercise})
        .then((data) => {
            console.log(data);
            if (data) {
                return res.status(404).send('User not found');
            }
            res.status(200).send(data);
        })
        .catch((error) => {
            console.error('Error adding exercise to routine:', error);
            res.status(500).send('Error adding exercise to routine');
        })
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.status(200).send(user.saved_exercises);
      } catch (error) {
        console.error('Error fetching user exercises:', error);
        res.status(500).send('Error fetching user exercises');
      }
});

module.exports = router;