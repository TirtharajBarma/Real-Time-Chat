const express = require('express'); // import express
const app = express();
const http = require('http').createServer(app); // Create HTTP server using express app
const PORT = process.env.PORT || 3000;          //  port

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + '/public'));  //that tells Express to serve static files from a specific directory
// __dirname is a global variable in Node.js that represents the directory name of the current module

app.get('/', (req, res) => {                     //  route 
    res.sendFile(__dirname + '/index.html')
});

//socket
const socketIo = require('socket.io')(http)

// listen for the 'connection' event, which is triggered whenever a client establishes a WebSocket connection with the server.
socketIo.on('connection', (socket)=>{
    console.log('Connected....');

    socket.on('message',(msg)=>{        //listen  "message = event name"
        // This callback function receives the message (msg) sent by the client.
        socket.broadcast.emit('message', msg);                //object passing
        // this broadcast the message to all the clients
    })
})
