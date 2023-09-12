const { pool } = require('../../../utils')

const controllers = {};

controllers.viewMovies = async (req, res) => {
    try {
        const aResult = await pool.query(`select * from movies`);
        return res.reply(messages.success(), aResult.rows)
    } catch (error) {
        console.log(error)
        return res.reply(messages.server_error())
    }
}

controllers.addMovie = async (req, res) => {
    try {
        const { nMovieId, sMovieName, nRating } = req.body;

        if (!nMovieId) return res.reply(messages.not_found('movie id'))
        if (!sMovieName) return res.reply(messages.not_found('movie name'))
        if (!nRating) return res.reply(messages.not_found('movie rating'))

        await pool.query('insert into movies (movie_id, name, rating) VALUES ($1,$2,$3)', [nMovieId, sMovieName, nRating]);
        return res.reply(messages.success())
    } catch (error) {
        console.log(error)
        return res.reply(messages.server_error())
    }
}

module.exports = controllers;