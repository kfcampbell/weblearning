// @ts-check

// initialize app to be a function handler that i can supply to an http server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// define a route handler (/) that gets called when we hit our website home page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// triggered when a user connects.
io.on('connection', function(socket){
    console.log('a user connected');

    // triggered when the user disconnects
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('user_disconnect', '<i>a user has disconnected, teh filthy bastard.</i>');
    });

    // triggered when a user sends a chat message.
    socket.on('chat message', function(msg){
        io.emit('chat message',msg);
    });
});

// make server listen on port 3000
http.listen(3000, function() {
    console.log('listening on *:3000');
});