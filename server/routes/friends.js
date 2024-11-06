const express = require('express');
const { User } = require('../db/index');
const router = express.Router();

router.get('/', (req, res) => {

  User.find({googleId: req.user.googleId})
    .then((foundUser) => {
      if (!foundUser){
        res.sendStatus(404);
        return;
      }

      res.status(200).send(foundUser.friends_list)
    })
    .catch((error) => {
      console.error(`Error on GET request to /api/friends.`)
      res.sendStatus(500);
    })

})

router.post('/', (req, res) => {
  User.findOneAndUpdate({googleId: req.user.googleId}, {$push: {friends_list: req.body.friend}})
    .then((foundUser) => {
      if (!foundUser){
        res.sendStatus(404);
        return;
      }

      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(`Error on POST request to /api/friends.`)
      res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
  User.findOneAndUpdate({googleId: req.user.googleId}, {$pull: {friends_list: {googleId: req.params.id}}})
    .then((foundUser) => {
      if (!foundUser){
        res.sendStatus(404);
        return;
      }

      res.status(200).send(foundUser)
    })
    .catch((error) => {
      console.error(`Error on DELETE request to /api/friends.`, error)
      res.sendStatus(500);
    })
})

module.exports = router;