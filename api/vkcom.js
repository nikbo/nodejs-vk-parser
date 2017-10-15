var router = require('express').Router();
var passport = require('passport');


router.get('/',
    passport.authenticate('vkontakte-token'),
    function (req, res) {
        if (!req.user) {
            return res.sendStatus(401);
        }
        return res.json(req.user);
    });

router.get('/user',
    function (req, res) {
        if (req.isAuthenticated()) {
            return res.json(req.user);
        } else {
            // if they aren't redirect them to the home page
            if (req.xhr) {
                res.status(403);
                res.json({error: 'Access Denied.'});
            } else {
                //res.redirect('/');
            }
        }
    }
);

module.exports = router;