const LinkUpServer = require('./src/core/server');

const server = new LinkUpServer();

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    server.setupWebSocket();
    server.setupGlobalMiddleware();
});
