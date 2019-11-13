const express = require('express');

const router = express.Router();

const Users = require('./user-model');

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not process your request ' + error.message });
  }
});

module.exports = router;
