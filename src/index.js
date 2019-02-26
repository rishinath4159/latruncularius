import "./js/chessboard-0.3.0";
import * as Chess from "chess.js";

//Initializing board and chess game.
let board;
const game  = new Chess();

//Only allows you to drag a piece if if is your turn and the game is still running.
const onDragStart = function(source, piece, position, orientation) {
    if (game.game_over() ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
};

//On piece drop, checks if move is valid in the chess game.
const onDrop = function(source, target) {
    let move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';
};

//After piece drop, updates the board from the chess game.
const onSnapEnd = function() {
    board.position(game.fen());
};

//Configuration for the board.
const config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

board = ChessBoard('board', config);

