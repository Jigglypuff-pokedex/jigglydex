const User = require('../models/User');

const favoritesController = {};

favoritesController.getFavorites = async (req, res, next) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return next({
                log: 'favoritesController.getFavorites: ERROR: Missing userId',
                status: 400,
                message: { err: 'Missing userId' },
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return next({
                log: 'favoritesController.getFavorites: ERROR: User not found',
                status: 404,
                message: { err: 'User not found' },
            });
        }
        res.locals.favorites = user.favorites;
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
        if (!userId || !pokemonId) {
            return next({
                log: 'favoritesController.addFavorite: ERROR: Missing userId or pokemonId',
                status: 400,
                message: { err: 'Missing userId or pokemonId' },
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return next({
                log: 'favoritesController.addFavorite: ERROR: User not found',
                status: 404,
                message: { err: 'User not found' },
            });
        }
        if (!user.favorites.includes(pokemonId)) {
            user.favorites.push(pokemonId);
            await user.save();
        }
        res.locals.favorites = user.favorites;
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
        if (!userId || !pokemonId) {
            return next({
                log: 'favoritesController.removeFavorite: ERROR: Missing userId or pokemonId',
                status: 400,
                message: { err: 'Missing userId or pokemonId' },
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return next({
                log: 'favoritesController.removeFavorite: ERROR: User not found',
                status: 404,
                message: { err: 'User not found' },
            });
        }
        user.favorites = user.favorites.filter(id => id !== parseInt(pokemonId));
        await user.save();
        res.locals.favorites = user.favorites;
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