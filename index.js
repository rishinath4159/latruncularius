const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const games = {
};

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html');
});

app.use(express.static('assets'));

io.on('connection', socket => {
    socket.on('board fen', fen => {
        games[fen[0]] = fen[1];
        io.sockets.in(fen[0]).emit('new pos', fen[1]);
    });
    socket.on('room', room => {
        socket.join(room);
        if (!(room in games)) games[room] = 'start';
        socket.emit('new pos', games[room]);
    })
});

http.listen(3000, _ => {
    console.log('listening on *:3000');
});