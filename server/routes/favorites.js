const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController')

//request to /favorites?userId=${id}, gets all pokemon that user has favorited
router.get('/', favoritesController.getFavorites, (req, res) => {
    return res.status(200).send(res.locals.favorites);
});

//request to /favorites?userId=${id}&pokemonId=${pokemonId}, adds a pokemon to user's favorites
router.post('/', favoritesController.addFavorites, (req, res) => {
    return res.status(200).send(res.locals.favorites);
});

//request to /favorites?userId=${id}&pokemonId=${pokemonId}, removes a pokemon from user's favorites
router.delete('/', favoritesController.removeFavorite, (req, res) => {
    return res.status(200).send(res.locals.favorites);
});

module.exports = router;