const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    user = new User({ firstName, lastName, email, username, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.locals.newUser = user;
    res.status(200).json({message: "signup successfully", id: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
    res.json({ token: `Bearer ${token}` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;