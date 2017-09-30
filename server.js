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
var players = {};
io.on('connection', function(socket){

    socket.on('new player', function(){
        players[socket.id] = {
            x: 300,
            y: 300,
            color: 'rgb(' + Math.trunc(Math.random() * 255) + ',' + Math.trunc(Math.random() * 255) + ',' + Math.trunc(Math.random() * 255) + ')'
        };
    });

    socket.on('movement', function(data){
        var player = players[socket.id] || {};
        if(data.left && !(player.x - 15 < 0)){
            player.x -= 5;
        }
        if(data.right && !(player.x + 15 > 800)){
            player.x += 5;
        }
        if(data.up && !(player.y - 15 < 0)){
            player.y -= 5;
        }
        if(data.down && !(player.y + 15 > 600)){
            player.y += 5;
        }
    });

    socket.on('disconnect', reason => {
        delete players[socket.id];
    });
});

setInterval(function(){
    io.sockets.emit('state', players);
}, 1000/60);