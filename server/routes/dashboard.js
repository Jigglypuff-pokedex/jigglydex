const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController')

//request to /dashboard?userId=${id}&type=${type}&generation=${generation}&game=${game}, gets all pokemon where filters match
router.get('/', dashboardController.getPokemon, (req, res) => {
    return res.status(200).send(res.locals.pokemon);
});

module.exports = router;