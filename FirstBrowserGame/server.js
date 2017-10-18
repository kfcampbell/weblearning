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
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// starts the server
server.listen(5000, function () {
    console.log('starting server on port 5000');
});

// add the websocket handlers
var players = {};
io.on('connection', function (socket) {

    socket.on('new player', function () {
        players[socket.id] = {
            x: 300,
            y: 300,
            missle: {
                x: -1,
                y: -1,
                direction: {
                    up: false,
                    down: false,
                    left: false,
                    right: false
                }
            },
            color: 'rgb(' + Math.trunc(Math.random() * 255) + ',' + Math.trunc(Math.random() * 255) + ',' + Math.trunc(Math.random() * 255) + ')'
        };
    });

    socket.on('movement', function (movement) {
        performMovement(players, socket.id, movement);
        fireMissles(players, socket.id, movement);
        checkAllCollisions(players, socket.id);
    });

    socket.on('disconnect', reason => {
        delete players[socket.id];
    });
});

function fireMissles(players, socketId, movement) {
    var player = players[socketId] || {};

    // reset and fire new missle
    if (movement.shooting) {
        player.missle = {
            x: player.x + 20,
            y: player.y + 20,
            direction: movement
        }
        return;
    }

    if (!player.missle) return;
    if (player.missle.x < 0 || player.missle.y < 0) return;

    // otherwise, check if old missle exists. update position as necessary.
    if (player.missle.direction.left && !(player.missle.x - 15 < 0)) {
        player.missle.x -= 10;
    }
    if (player.missle.direction.right && !(player.missle.x + 15 > 800)) {
        player.missle.x += 10;
    }
    if (player.missle.direction.up && !(player.missle.y - 15 < 0)) {
        player.missle.y -= 10;
    }
    if (player.missle.direction.down && !(player.missle.y + 15 > 600)) {
        player.missle.y += 10;
    }
}

function checkAllCollisions(players, socketId) {
    var player = players[socketId] || {};
    for (var key in players) {
        if (key != socketId) {
            if (determineCollision(player, players[key])) {
                // broadcast event here to respawn player
                delete players[key];
            }
        }
    }
}

function determineCollision(playerOne, playerTwo) {
    /*if(determineXCollision(playerOneMovement, playerOne, playerTwo) && determineYCollision(playerOneMovement, playerOne, playerTwo)){
        return true;
    }*/
    return false;

}

function performMovement(players, socketId, movement) {
    var player = players[socketId] || {};

    if (movement.left && !(player.x - 15 < 0)) {
        player.x -= 5;
    }
    if (movement.right && !(player.x + 15 > 800)) {
        player.x += 5;
    }
    if (movement.up && !(player.y - 15 < 0)) {
        player.y -= 5;
    }
    if (movement.down && !(player.y + 15 > 600)) {
        player.y += 5;
    }
}

function determineXCollision(playerOne, playerTwo) {
    if (playerOne.x - 15 >= playerTwo.x + 15 && playerOne.x - 15 <= playerTwo.x + 15) {
        return true;
    }
    if (playerOne.x + 15 >= playerTwo.x - 15 && playerOne.x - 15 <= playerTwo.x - 15) {
        return true;
    }
    return false;
}

function determineYCollision(playerOne, playerTwo) {
    if (playerOne.y - 15 >= playerTwo.y + 15 && playerOne.y - 15 <= playerTwo.y + 15) {
        return true;
    }
    if (playerOne.y + 15 >= playerTwo.y - 15 && playerOne.y + 15 <= playerTwo.y - 15) {
        return true;
    }
    return false;
}

setInterval(function () {
    io.sockets.emit('state', players);
}, 1000 / 60);