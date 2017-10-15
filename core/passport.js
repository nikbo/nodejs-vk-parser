var usersService = require('./services/usersService');
var VKontakteTokenStrategy = require('passport-vkontakte-token');
var settings = require('./settings');

module.exports = function (passport) {
    passport.use(new VKontakteTokenStrategy({
        clientID: settings.login.vk.appId,
        clientSecret: settings.login.vk.secret,
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, next) {
        var id = profile._json.id;
        if (!id) return next('Id is missing');
        usersService.getUserById(id).then(user => {
            if (user) return next(null, usersService.getUserObject(user));

            return usersService.insertUser({
                id: profile._json.id,
                passwordHash: 123,//bcrypt.hashSync(crypto.randomBytes(5).toString('hex'), bcrypt.genSaltSync()),
                first_name: profile._json.first_name,
                last_name: profile._json.last_name,
                photo: profile._json.photo,
                sex: profile._json.sex,
                screen_name: profile._json.screen_name
            })
                .then(usersService.getUser)
                .then(user => {
                    next(null, usersService.getUserObject(user));
                });
        }).catch(next);
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        usersService.getUser(id)
            .then(user => done(null, usersService.getUserObject(user)))
            .catch(done);
    });
};