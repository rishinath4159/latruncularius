const app = require('express')();
const express = require('express');
const Chess = require('chess.js').Chess;
const http = require('http').Server(app);
const io = require('socket.io')(http);

const games = {
};

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html');
});

app.use(express.static('assets'));

io.on('connection', socket => {
    io.emit('rooms', games);

    socket.on('move', (room, source, target) => {
        let move = games[room].move({
            from: source,
            to: target,
            promotion: 'q'
        });
        socket.emit('new pos', games[room].fen());
        socket.emit('history', games[room].history());
    });

    socket.on('room', room => {
        socket.join(room);
        if (!(room in games)) { games[room] = new Chess(); io.emit('rooms', games); }
        socket.emit('new pos', games[room].fen());
        socket.emit('history', games[room].history());
    });

});

http.listen(3000, _ => {
    console.log('listening on *:3000');
});