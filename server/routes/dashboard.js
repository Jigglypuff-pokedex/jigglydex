const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../controllers/authMiddleware'); // Import the auth middleware

// Protect the /dashboard route with authMiddleware
router.get('/', authMiddleware, dashboardController.getPokemon, (req, res) => {
    return res.status(200).send(res.locals.pokemon);
});

router.get('/random', authMiddleware, dashboardController.getRandomPokemon, (req, res) => {
    return res.status(200).send(res.locals.randomPokemon);
});

module.exports = router;