const ErrorHandler = require('../utils/ErrorHandler');
const errorHandler = new ErrorHandler();

class Router {
    constructor() {
        this.routes = { GET: {}, POST: {}, UPDATE: {}, DELETE: {} };
        this.middlewares = [];
    }

    async resolve(req, res) {
        const handler = this.routes[req.method][req.url];

        const next = async (index = 0) => {
            try {
                if (index < this.middlewares.length) {
                    await this.middlewares[index](req, res, () => next(index + 1));
                } else if (handler) {
                    await handler(req, res);
                } else {
                    throw new CustomError(404, 'Not Found');
                }
            } catch (err) {
                if (err instanceof CustomError) {
                    errorHandler.handle(err, req, res);
                } else {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
            }
        }

        next();
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    add(method, path, handler) {
        this.routes[method][handler] = handler;
    }
}

module.exports = Router;