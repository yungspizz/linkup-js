const http = require('http');
const Router = require('./router');
const WebSocketHandler = require('../handlers/webSocketHandler');
const cors = require('../middlewares/cors');
const rateLimiter = require('../middlewares/rateLimiter');
const bodyParser = require('../middlewares/bodyParser');
const setSecurityHeaders = require('../middlewares/setSecurityHeaders');

class LinkUpServer {
    constructor() {
        this.router = new Router();
        this.server = http.createServer((req, res) => this.router.resolve(req, res));
    }

    use(middleware) {
        this.router.use(middleware);
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    get(path, handler) {
        this.router.add('GET', path, handler);
    }

    post(path, handler) {
        this.router.add('POST', path, handler);
    }
    
    update(path, handler) {
        this.router.add('UPDATE', path, handler);
    }

    delete(path, handler) {
        this.router.add('DELETE', path, handler);
    }

    setupWebSocket() {
        this.webSocketHandler = new WebSocketHandler(this.server);
    }

    setupGlobalMiddleware() {
        this.use(cors());
        this.use(rateLimiter());
        this.use(bodyParser());
        this.use(setSecurityHeaders());
    }
}

module.exports = LinkUpServer;