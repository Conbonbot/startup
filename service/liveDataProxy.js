const { WebSocketServer } = require('ws');
const uuid = require('uuid');

const wss = new WebSocketServer({ noServer: true });

function liveDataProxy(httpServer){
    
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });
    let connections = [];
    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);
        console.log("connected successfully");

        // Remove closed connection
        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);

            if (pos >= 0){
                connections.splice(pos,1);
            }
        });

        // Respond to pong messages by marking the connection alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    // Keep active connections, terminate any old connections (every 10 seconds)
    setInterval(() => {
        connections.forEach((c) => {
            if(!c.alive){
                c.ws.terminate();
                console.log("connection terminated");
            }
            else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);

}

function sendUpdatedStocks(data){
    const sendData = JSON.stringify(data);
    wss.clients.forEach((c) => {
        c.send(sendData);
    });

}

module.exports = { 
    liveDataProxy,
    sendUpdatedStocks
}