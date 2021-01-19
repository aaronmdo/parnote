var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



io.on('connection', (socket)=> {
    console.log('User Online');
 
    // Message will be broadcasted to all other connected users
    socket.on('canvas-data', (data)=> {
        socket.broadcast.emit('canvas-data', data);
    })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})