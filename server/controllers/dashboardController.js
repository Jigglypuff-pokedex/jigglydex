const dashboardController = {};

dashboardController.getPokemon = async (req, res, next) => {
    console.log('getPokemon middleware');
    const { type, generation } = req.query;
    if (!type || !generation) {
        return next({
            log: 'dashboardController.getPokemon: ERROR: Missing query parameters',
            status: 400,
            message: { err: 'Missing query parameters' },
        });
    }
    try {
        let fetchedUrls = [];
        // if type, generation, game all selected as 'All', return all pokemon
        if (type === 'All' && generation === 'All') {
            //fetching just 100 so run time isn't crazy for demo
            const allPokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
            const allPokemonData = await allPokemonResponse.json();
            fetchedUrls = allPokemonData.results.map(pokemon => pokemon.url);
        } else {
            // if filters pokemon to fetch based on query parameters
            let typeUrls = []
            let generationUrls = [];
            if (type !== 'All') {
                const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
                const typeData = await typeResponse.json();
                typeUrls = typeData.pokemon.map(pokemon => pokemon.pokemon.url);
            }
            if (generation !== 'All') {
                const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
                const generationData = await generationResponse.json();
                const speciesUrls = generationData.pokemon_species.map(pokemon => pokemon.url);
                
                const generationPromises = speciesUrls.map(async (url) => {
                    const response = await fetch(url);
                    const data = await response.json();
                    // iterate over each variety and get the pokemon url
                    data.varieties.forEach(variety => {
                        generationUrls.push(variety.pokemon.url);
                    });
                });
            
                await Promise.all(generationPromises);
            }

            //get intersection of fetchedUrls
            if(typeUrls) {
                fetchedUrls = typeUrls;
            }
            if(generationUrls) {
                fetchedUrls = fetchedUrls.size ? [...fetchedUrls].filter(url => generationUrls.has(url)) : generationUrls;
            }
        }
        res.locals.pokemon = fetchedUrls;
        //fetchedUrls has all pokemon urls
        //iterate over fetchedUrls and fetch each pokemon's data
        const fetchedPokemon = [];

        const fetchAllPokemon = async () => {
            const fetchPromises = fetchedUrls.map(async (url) => {
                const response = await fetch(url);
                const data = await response.json();
                // pokemon name, id, types, image
                return {
                    name: data.name,
                    id: data.id,
                    types: data.types.map(type => type.type.name),
                    image: data.sprites.front_default,
                    stats: {
                        hp: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        specialAttack: data.stats[3].base_stat,
                        specialDefense: data.stats[4].base_stat,
                        speed: data.stats[5].base_stat,
                    }
                };
            });
            const fetchedPokemon = await Promise.all(fetchPromises);
            res.locals.pokemon = fetchedPokemon;
        };

        await fetchAllPokemon();
        return next();
    } catch (err) {
        return next({
            log: `dashboardController.getPokemon: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while fetching Pokémon' },
        });
    }
}

dashboardController.getRandomPokemon = async (req, res, next) => {
    try {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        const randomPokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const randomPokemonData = await randomPokemonResponse.json();
        res.locals.randomPokemon = {
            name: randomPokemonData.name,
            id: randomPokemonData.id,
            types: randomPokemonData.types.map(type => type.type.name),
            image: randomPokemonData.sprites.front_default,
            stats: {
                hp: randomPokemonData.stats[0].base_stat,
                attack: randomPokemonData.stats[1].base_stat,
                defense: randomPokemonData.stats[2].base_stat,
                specialAttack: randomPokemonData.stats[3].base_stat,
                specialDefense: randomPokemonData.stats[4].base_stat,
                speed: randomPokemonData.stats[5].base_stat,
            }
        };
        return next();
    } catch (err) {
        return next({
            log: `dashboardController.getRandomPokemon: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while fetching random Pokémon' },
        });
    }
};
module.exports = dashboardController;