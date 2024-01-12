const WebSocket = require('ws');

class WebSocketHandler {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });

        this.wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                console.log('Recieved message:', message);
                // Handle incoming message
            });

            ws.on('close', () => {
                console.log('Client disconnected');
                // Handle client disconnection
            });
        });
    }

    broadcast(data) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }
}

module.exports = WebSocketHandler;