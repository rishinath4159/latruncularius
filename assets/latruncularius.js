const socket = io();


function onSnapEnd(source, target) {
    socket.emit('move', room, source, target);
}

const config = {
    draggable: true,
    position: 'start',
    onSnapEnd: onSnapEnd
};

let room = Math.random().toString(36).substring(7);

function joinRoom() {
    room = prompt("Room ID");
    while (room.includes('>')) { room = prompt("Room ID \n Can only include regular characters.") }
    socket.emit('room', room);
    $("#room").text(`Current Room: ${room}`);
};


$(function () {

    socket.emit('room', room);
    $("#room").text(`Current Room: ${room}`);
    $("#join-room").click(_ => {joinRoom()});

    socket.on('rooms', rooms => {
        $("#rooms").html(`<li class="list-group-item list-group-item-info">Rooms</li>`);
        (Object.keys(rooms)).forEach(room => {
            if (room.length > 0) $("#rooms").append(
                `<li class="list-group-item">${room + " "}</li>`);
        })
    });

    socket.on('update', (fen, history) => {
        board.position(fen);
        $("#history").html(`<li class="list-group-item list-group-item-info">History</li>`);
        history.reverse().forEach((event, index, events) => {
            $("#history").append(`<li class="list-group-item list-group-item-${
                (events.length & 1) === (index & 1) ? "dark" : "light"
                }">${event}</li>`)
        });
    });

    const board = ChessBoard('board', config);
});