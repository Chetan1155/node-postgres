const router = require('express').Router();
const controllers = require('./lib/controller');


router.get('/test', controllers.test)

module.exports = router