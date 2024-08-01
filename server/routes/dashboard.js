const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.getPokemon, (req, res) => {
    return res.status(200).send(res.locals.pokemon);
});

router.get('/random', dashboardController.getRandomPokemon, (req, res) => {
    return res.status(200).send(res.locals.randomPokemon);
});

router.get('/specific', dashboardController.getOnePokemon, (req, res) => {
    return res.status(200).send(res.locals.randomPokemon);
})


module.exports = router;