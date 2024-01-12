const CustomError = require('./CustomError');

class ErrorHandler {
    handle(err, req, res) {
        if (err instanceof CustomError) {
            res.writeHead(err.status, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: err.message}));
        } else {
            this.logError(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error'}))
        }
    }

    logError(err) {
        const logInfo = {
            message: err.message,
            stack: err.stack,
            url: req.url,
            method: req.method
        };

        if (err instanceof CustomError) {
            logger.error(`Custom Error: ${JSON.stringify(logInfo)}`);
        } else {
            logger.error(`UnhandledError: ${JSON.stringify(logInfo)}`);
        }
    }
}

module.exports = ErrorHandler;