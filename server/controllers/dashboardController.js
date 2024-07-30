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
        let fetchedUrls = new Set();
        // if type, generation, game all selected as 'All', return all pokemon
        if (type === 'All' && generation === 'All' && game === 'All') {
            //fetching just 100 so run time isn't crazy for demo
            const allPokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit='); // 1302 pokemon total, limit 1500 will get all in the fetch
            const allPokemonData = await allPokemonResponse.json();
            fetchedUrls = new Set(allPokemonData.results.map(pokemon => pokemon.url));
        } else {
            // if filters pokemon to fetch based on query parameters
            let typeUrls, generationUrls, gameUrls;
            if (type !== 'All') {
                const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
                const typeData = await typeResponse.json();
                typeUrls = new Set(typeData.pokemon.map(pokemon => pokemon.pokemon.url));
            }
            if (generation !== 'All') {
                const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
                const generationData = await generationResponse.json();
                generationUrls = new Set(generationData.pokemon_species.map(pokemon => pokemon.url));
            }
            if (game !== 'All') {
                const gameResponse = await fetch(`https://pokeapi.co/api/v2/version/${game}`);
                const gameData = await gameResponse.json();
                gameUrls = new Set(gameData.pokemon_species.map(pokemon => pokemon.url));
            }
            //get intersection of fetchedUrls
            if(typeUrls) {
                fetchedUrls = typeUrls;
            }
            //if fetchedUrls is empty, no need to filter
            if(generationUrls) {
                fetchedUrls = fetchedUrls.size ? new Set([...fetchedUrls].filter(url => generationUrls.has(url))) : generationUrls;
            }
            if(gameUrls) {
                fetchedUrls = fetchedUrls.size ? new Set([...fetchedUrls].filter(url => gameUrls.has(url))) : gameUrls;
            }
        }
        //fetchedUrls has all pokemon urls
        //iterate over fetchedUrls and fetch each pokemon's data
        const fetchedPokemon = [];

        const fetchAllPokemon = async () => {
            const fetchPromises = Array.from(fetchedUrls).map(async (url) => {
                const response = await fetch(url);
                const data = await response.json();
                // pokemon name, id, types, image
                return {
                    name: data.name,
                    id: data.id,
                    types: data.types.map(type => type.type.name),
                    image: data.sprites.front_default
                };
            });
        
            const results = await Promise.all(fetchPromises);
            fetchedPokemon.push(...results);
            console.log('fetchedpokemon', fetchedPokemon);
            res.locals.pokemon = fetchedPokemon;
        };

        fetchAllPokemon().then(() => next());
    } catch (err) {
        return next({
            log: `dashboardController.getPokemon: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while fetching Pokémon' },
        });
    }
}

module.exports = dashboardController;