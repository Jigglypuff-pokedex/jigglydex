const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config');

const router = express.Router();
// Post Request for Signup
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
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
// Post Request for Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ email: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ password: 'Incorrect password' });
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
