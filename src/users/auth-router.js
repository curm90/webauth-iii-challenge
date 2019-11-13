const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Users = require('./user-model');

router.post('/register', async (req, res) => {
  const { username, password, department } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  const newUser = {
    username,
    password: hash,
    department
  };

  try {
    const addedUser = await Users.add(newUser);
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json({ message: 'Could not register ' + error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(404).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Could not login ' + error.message });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['student']
  };
  const options = {
    expiresIn: '1d'
  };

  const result = jwt.sign(payload, process.env.SECRET, options);

  return result;
}

module.exports = router;
