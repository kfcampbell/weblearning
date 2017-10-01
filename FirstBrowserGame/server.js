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

    socket.on('movement', function(movement){
        checkBoundsAndPerformMovement(players, socket.id, movement);
    });

    socket.on('disconnect', reason => {
        delete players[socket.id];
    });
});

function checkBoundsAndPerformMovement(players, socketId, movement){
        var player = players[socketId] || {};
        for(var key in players){
                if(key != socketId){
                    // check bounds to determine collision or not.
                    if(determineCollision(movement, player, players[key])){
                        // broadcast event here to respawn player
                        delete players[key];
                    }
                }
            }
        if(movement.left && !(player.x - 15 < 0)){
            player.x -= 5;
        }
        if(movement.right && !(player.x + 15 > 800)){
            player.x += 5;
        }
        if(movement.up && !(player.y - 15 < 0)){
            player.y -= 5;
        }
        if(movement.down && !(player.y + 15 > 600)){
            player.y += 5;
        }
}

function determineCollision(playerOneMovement, playerOne, playerTwo){
    
    if(determineXCollision(playerOneMovement, playerOne, playerTwo) && determineYCollision(playerOneMovement, playerOne, playerTwo)){
        return true;
    }
    return false;
    
}

function determineXCollision(playerOneMovement, playerOne, playerTwo){
    if(playerOne.x - 15 >= playerTwo.x + 15 && playerOne.x - 15 <= playerTwo.x + 15){
        return true;
    }
    if(playerOne.x + 15 >= playerTwo.x - 15 && playerOne.x - 15 <= playerTwo.x - 15){
        return true;
    }
    return false;
}

function determineYCollision(playerOneMovement, playerOne, playerTwo){
    if(playerOne.y - 15 >= playerTwo.y + 15 && playerOne.y - 15 <= playerTwo.y + 15){
        return true;
    }
    if(playerOne.y + 15 >= playerTwo.y - 15 && playerOne.y + 15 <= playerTwo.y - 15){
        return true;
    }
    return false;
}

setInterval(function(){
    io.sockets.emit('state', players);
}, 1000/60);