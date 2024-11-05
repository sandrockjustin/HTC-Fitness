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

  User.find({googleId: req.user.googleId})
    .then((foundUser) => {
      if (!foundUser){
        res.sendStatus(404);
        return;
      }

      foundUser.friends_list.push(req.body.friend);
      return foundUser.save()
    })
    .then((updatedUser) => {
      res.status(201).send(updatedUser)
    })
    .catch((error) => {
      console.error(`Error on POST request to /api/friends.`)
      res.sendStatus(500);
    })

})

router.delete('/:id', (req, res) => {
  User.find({googleId: req.user.googleId})
  .then((foundUser) => {
    if (!foundUser){
      res.sendStatus(404);
      return;
    }

    // if user is found, reassign friends_list property to exclude item for deletion
    foundUser.friends_list = foundUser.friends_list.filter((friend) => {
      return friend.googleId !== req.params.id
    })

    // return the promise that these changes will be saved
    return foundUser.save()
  })
  .then((updatedUser) => {
    // once changes have been saved, try to send updatedUser
    res.status(200).send(updatedUser)
  })
  .catch((error) => {
    console.error(`Error on DELETE request to /api/friends.`)
    res.sendStatus(500);
  })
})

module.exports = router;