
const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.





wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(data);
  });
};

wss.on('connection', (ws) => {
  const userCount = wss.clients.size;
  const countObj = {
    type: 'userCount',
    userCount: userCount,
  }
  wss.broadcast(JSON.stringify(countObj));

  ws.on('message', function incoming(message) {
   let msg = JSON.parse(message)
     
   switch(msg.type) {
    case 'postMessage':
    const newMessage = {
      id: uuidv1(),
      type: 'incomingMessage',
      username: msg.username,
      content: msg.content
    };
    wss.broadcast(JSON.stringify(newMessage));
      break;
    case 'postNotification':
    console.log(msg)
    const newNotif = {
      id: uuidv1(),
      type: 'incomingNotification',
      username: msg.username,
      content: msg.content
    };
    wss.broadcast(JSON.stringify(newNotif));
      break;
      default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + msg.type);
   }

  });
   
 

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});