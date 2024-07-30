const favoritesController = {};

favoritesController.getFavorites = async (req, res, next) => {
    try {
        const { userId } = req.query;
        //DOES NOT FETCH FROM DB
        res.locals.favorites = `Temporary favorites: userID=${userId}`;
        return next();
    } catch (err) {
        return next({
            log: `favoritesController.getFavorites: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while fetching favorites' },
        });
    }
};

favoritesController.addFavorite = async (req, res, next) => {
    try {
        const { userId, pokemonId } = req.body;
        //DOES NOT ADD TO DB
        res.locals.favorites = pokemonId;
        return next();
    } catch (err) {
        return next({
            log: `favoritesController.addFavorite: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while adding favorite' },
        });
    }
};

favoritesController.removeFavorite = async (req, res, next) => {
    try {
        const { userId, pokemonId } = req.query;
        //DOES NOT REMOVE FROM DB
        res.locals.favorites = `temporary remove message`;
        return next();
    } catch (err) {
        return next({
            log: `favoritesController.removeFavorite: ERROR: ${err}`,
            status: 500,
            message: { err: 'An error occurred while removing favorite' },
        });
    }
};

module.exports = favoritesController;