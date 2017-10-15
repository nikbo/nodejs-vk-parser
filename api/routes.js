var express = require('express');
var router = express.Router();
var passport = require('passport');

var vkcom = require('./vkcom');

router.use('/vkontakte', vkcom);

module.exports = router;