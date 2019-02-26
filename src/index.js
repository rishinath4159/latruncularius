import "./js/chessboard-0.3.0";
import * as Chess from "chess.js";

let board;
const game = new Chess();

const makeRandomMove = function() {
    let possibleMoves = game.moves();

    // exit if the game is over
    if (game.game_over() === true ||
        game.in_draw() === true ||
        possibleMoves.length === 0) return;

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());

    window.setTimeout(makeRandomMove, 500);
};

board = ChessBoard('board', 'start');

window.setTimeout(makeRandomMove, 500);


