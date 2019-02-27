const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html');
});

app.use(express.static('assets'));

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', _ => {
        console.log('user disconnected');
    });
});

io.on('connection', socket => {
    socket.on('board fen', fen => {
        console.log('board fen', fen);
        io.emit('board fen', fen);
    });
});

http.listen(3000, _ => {
    console.log('listening on *:3000');
});