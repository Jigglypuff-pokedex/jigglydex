const axios = require('axios');

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
        let fetchedPokemon;
        // If type, generation, game all selected as 'All', return all Pokemon
        if (type === 'All' && generation === 'All' && game === 'All') {
            const allPokemonResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1500'); // 1302 Pokemon total, limit 1500 will get all in the fetch
            const allPokemonData = allPokemonResponse.data;
            fetchedPokemon = allPokemonData.results.map(pokemon => pokemon.url);
        } else {
            // Filter Pokémon based on query parameters
            fetchedPokemon = await filterPokemon(type, generation, game);
        }

        res.locals.pokemon = fetchedPokemon;
        return next();

    } catch (err) {
        return next({
            log: `dashboardController.getPokemon: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while fetching Pokémon' },
        });
    }
};

// Helper function to filter Pokémon based on type, generation, and game
const filterPokemon = async (type, generation, game) => {
    let fetchedPokemon = [];

    // Filter by type
    if (type !== 'All') {
        const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const typeData = typeResponse.data;
        fetchedPokemon = typeData.pokemon.map(p => p.pokemon.url);
    }

    // Filter by generation
    if (generation !== 'All') {
        const generationResponse = await axios.get(`https://pokeapi.co/api/v2/generation/${generation}`);
        const generationData = generationResponse.data;
        const generationPokemon = generationData.pokemon_species.map(p => p.url);

        if (fetchedPokemon.length > 0) {
            // Intersect with previously fetched data
            fetchedPokemon = fetchedPokemon.filter(url => generationPokemon.includes(url));
        } else {
            fetchedPokemon = generationPokemon;
        }
    }

    // Filter by game
    if (game !== 'All') {
        const gameResponse = await axios.get(`https://pokeapi.co/api/v2/version/${game}`);
        const gameData = gameResponse.data;
        const gamePokemon = gameData.version_group.pokemon_species.map(p => p.url);

        if (fetchedPokemon.length > 0) {
            // Intersect with previously fetched data
            fetchedPokemon = fetchedPokemon.filter(url => gamePokemon.includes(url));
        } else {
            fetchedPokemon = gamePokemon;
        }
    }

    return fetchedPokemon;
};

module.exports = dashboardController;