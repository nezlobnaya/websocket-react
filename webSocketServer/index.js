const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketServerPort);
console.log('listening on port 8000');

const wsServer = new webSocketServer({
    httpServer: server 
});

const clients = {};

//this code generates unique userid for every user
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0*10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    const userID = getUniqueID();
    console.log((new Date() + ' Received a new connection from origin ' + http.request.origin + '.'));

    const connection = request.accept(null, request.origin);
    client[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received message: ', message.utf8Data);

            //broadcasting message to all connected clients
            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent message to: ', clients[key]);
            }
        }
    })
});

