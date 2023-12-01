const { WebSocketServer } = require('ws');
const uuid = require('uuid');


function peerProxy(httpServer) {
  // Create a websocket object
    console.log("HERE!");
    const wss = new WebSocketServer({ noServer: true });

    // Handle the protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    let connections = [];
    wss.on('connection', (ws) => {
        
        console.log('WebSocket connection established');
        // Handle messages from the WebSocket client
        ws.on('message', (message) => {
            console.log(`Received message: ${message}`);
            ws.send(`Server received your message: ${message}`);

            let object = JSON.parse(message);
            console.log(object);

            if (object.message === "ADDING CONNECTION") {
                let connection = {groupID: object.groupID, ws: ws};
                connections.push(connection);
            } else if (object.message === "ADDING TASK") {
                connections.forEach((connection) => {
                    if (connection.groupID !== object.groupID) {
                        return;
                    }
                    connection.ws.send(JSON.stringify({message: "UPDATE TASKS"}));
                });
            }


        });

        

        // Log WebSocket errors
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        // Log WebSocket close events
        ws.on('close', (code, reason) => {
            console.log(`WebSocket closed: code ${code}, reason ${reason}`);
        });
    });
}

module.exports = { peerProxy };


// const wss = new WebSocketServer({ noServer: true });

// // Handle the protocol upgrade from HTTP to WebSocket
// app.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, function done(ws) {
//     console.log("UPGRADED TO WSS")
//     wss.emit('connection', ws, request);
//   });
// });

// wss.on('connection', (ws) => {
//   console.log('WebSocket connection established');

//   // Handle messages from the WebSocket client
//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);
//   });

//   // Send a welcome message to the WebSocket client
//   ws.send('Welcome to the WebSocket server!');

//   // Log WebSocket errors
//   ws.on('error', (error) => {
//     console.error('WebSocket error:', error);
//   });

//   // Log WebSocket close events
//   ws.on('close', (code, reason) => {
//     console.log(`WebSocket closed: code ${code}, reason ${reason}`);
//   });
// });