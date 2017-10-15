var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var passport = require('passport');
var timeout = require('connect-timeout');
var compression = require('compression');
var settings = require('./core/settings');
var client = {
    dist: path.join(__dirname, 'webapp', 'dist'),
    index: path.join(__dirname, 'webapp/dist', 'index.html')
};
var api = require('./api/routes');
var authorize = require('./core/middleware/authorize');

var debug = require('debug')('server');
var http = require('http');

// init app
var app = express();

initViewEngine();
initSessionMiddleware();
initErrorHandlers();
initServer();
initRoutes();
initProcessExceptionHandler();


function initSessionMiddleware() {
    require('./core/passport')(passport);

    // required for passport
    app.use(session({
        secret: 'my session thg',  // session secret
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
}

function initViewEngine() {
    app.engine('html', exphbs({}));
    app.set('views', path.join(__dirname, 'aurelia'));
    app.set('view engine', 'html');
}

function initServer() {
    http.createServer(app);

    app.use(compression());
    app.use(timeout('600s'));

    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}));


    //app.use(express.static(path.join(__dirname, isProdEnvironment ? 'dist' : '')));
    app.use(express.static(client.dist));

    app.listen(settings.server.PORT);
    console.info('App is available on http://localhost:'+settings.server.PORT);
}

function initRoutes() {
    app.use('/api', authorize(), api);
    app.use('/login', api);

    app.all('/*', function (req, res) {
        res.sendFile(client.index);
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

function initErrorHandlers() {
    app.use(logErrors);
    app.use(ajaxErrorHandler);
    app.use(errorHandler);

    function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }

    function ajaxErrorHandler(err, req, res, next) {
        console.trace(err.stack);
        res.status(err.status || 500);
        if (err.message) {
            err.msg = err.message;
        }
        if (req.xhr) {
            res.json({error: err});
        } else {
            next(err);
        }
    }

    // development error handler will print stacktrace
    function errorHandler(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: app.get('env') === 'dev' ? err : {}
        });
    }
}


function initProcessExceptionHandler() {
    process.on('uncaughtException', function (err) {
        console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
        console.error(err.stack);
    });
}