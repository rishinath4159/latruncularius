const app = require('express')();
const express = require('express');
const Chess = require('chess.js').Chess;
const http = require('http').Server(app);
const io = require('socket.io')(http);

const games = {};

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html');
});

app.use(express.static('assets'));

http.listen(3000, _ => {
    console.log('listening on *:3000');
});

io.on('connection', socket => {

    io.emit('rooms', games);

    socket.on('move', (room, source, target) => {
        games[room].move({
            from: source,
            to: target,
            promotion: 'q'
        });
        io.in(room).emit('update', games[room].fen(), games[room].history());
    });

    socket.on('room', room => {
        socket.join(room);
        if (!(room in games)) { games[room] = new Chess(); io.emit('rooms', games); }
        socket.emit('update', games[room].fen(), games[room].history())
    });

});
