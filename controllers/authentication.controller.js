var express = require('express'),
    router = express.Router();

var authenticationRoute = require('../api/v1/authentication.route.v1');

router.post('/login', authenticationRoute.login);
router.post('/register', authenticationRoute.register);

module.exports = router;