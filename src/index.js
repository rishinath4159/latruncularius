import "../assets/js/chessboard-0.3.0";

const cfg = {
    draggable: true,
    dropOffBoard: 'snapback', // this is the default
    position: 'start'
};

const board = ChessBoard('board', cfg);

/*let div = document.createElement("div");
div.setAttribute = ('class', 'board');
document.body.appendChild(div);*/