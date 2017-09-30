// @ts-check

// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// routing
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, 'index.html'));
});

// starts the server
server.listen(5000, function(){
    console.log('starting server on port 5000');
});

// add the websocket handlers
io.on('connection', function(socket){

});

setInterval(function(){
    io.sockets.emit('message', 'hi!');
}, 1000);
