const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const session = require('express-session');
const routes = require('./routes');

function Router(){
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.corsOptions = {
        origin: [process.env.URL, '*'],
        methods: ['GET', 'POST', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
}

Router.prototype.initialize = function () {
    this.setupMiddleware();
    this.setupServer();
};

Router.prototype.setupMiddleware = function () {
    this.app.disable('etag');
    this.app.enable('trust proxy');
    this.app.use(compression());
    this.app.use(cors(this.corsOptions));
    this.app.use(bodyParser.json({ limit: '16mb' }));
    this.app.use(
        bodyParser.urlencoded({
            limit: '16mb',
            extended: true,
            parameterLimit: 50000,
        })
    );
    this.app.use(
        session({
            secret: process.env.JWT_SECRET,
            resave: true,
            saveUninitialized: true,
        })
    );

    this.app.use('/api/v1', routes);
    this.app.use('*', this.routeHandler);
};

Router.prototype.setupServer = function () {
    this.httpServer = http.Server(this.app);
    this.httpServer.timeout = 10000;
    this.httpServer.listen(process.env.PORT, '0.0.0.0', () =>
        console.log(`Spinning on ${process.env.PORT}`)
    );
};

Router.prototype.routeHandler = function (req, res) {
    res.status(404);
    res.send({ message: 'Route not found' });
};


module.exports = new Router();