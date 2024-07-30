const { all } = require("../routes/dashboard");

const dashboardController = {};

dashboardController.getPokemon = async (req, res, next) => {
    console.log('getPokemon middleware');
    const { type, generation, game } = req.query;
    if (!type || !generation || !game) {
        return next({
            log: 'dashboardController.getPokemon: ERROR: Missing query parameters',
            status: 400,
            message: { err: 'Missing query parameters' },
        });
    }

    try {
        let fetchedUrls;;
        // if type, generation, game all selected as 'All', return all pokemon
        if (type === 'All' && generation === 'All' && game === 'All') {
            const allPokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500'); // 1302 pokemon total, limit 1500 will get all in the fetch
            const allPokemonData = await allPokemonResponse.json();
            fetchedUrls = allPokemonData.results.map(pokemon => pokemon.url);
        } else {
            // if filters pokemon to fetch based on query parameters
        }
        //after filter, get pokemon data from url
        //iterate over fetchedUrls and fetch each pokemon's data
        const fetchedPokemon = {};
        fetchedUrls.forEach(async (url) => {
            const pokemonData = {};
            const response = await fetch(url);
            const data = await response.json();
        })

    } catch (err) {
        return next({
            log: `dashboardController.getPokemon: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while fetching Pokémon' },
        });
    }

    const pokemon = [];
    res.locals.pokemon = pokemon;
    return next();
}

module.exports = dashboardController;