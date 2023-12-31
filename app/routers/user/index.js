const router = require('express').Router();
const controllers = require('./lib/controller');


router.post('/add-movie', controllers.addMovie)
router.get('/view-data', controllers.viewMovies)
router.post('/update-movie', controllers.updateMovie)

module.exports = router