// tic tac toe
// 3x3 grid
// 0: default value, X: is X mark, O: is O mark

function Cell(){
    let value = 0;

    const getValue = () => value;
    const addMark = (mark) => value = mark;

    return { getValue, addMark };
}

function GameBoard(){
    const row = 3;
    const column = 3;
    const board = []

    for (let i = 0; i < row; i++){
        board[i] = []
        for (let j = 0; j < column; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markACell = (specificRow, specificColumn, mark) => {
        if (board[specificRow][specificColumn].getValue() !== 0) return;
        board[specificRow][specificColumn].addMark(mark);
    }

    const printBoard = () => {
        const boardWithCellValue = getBoard().map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCellValue);
    }

    return { getBoard, markACell, printBoard };
}

function GameControler(player1 = "Player1", player2 = "Player2"){
    const board = GameBoard();

    const player = [
        {name: player1, marker: "X"},
        {name: player2, marker: "O"}
    ]

    let activePlayer = player[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer.name === "Player1" ? player[1] : player[0];
    }

    const printNewRound = () => {
        console.log(`Now is ${getActivePlayer().name} turn`);
        board.printBoard();
    }

    const playRound = (rowPosition, columnPosition) => {
        console.log(`${getActivePlayer().name} choose (${rowPosition}, ${columnPosition}) position`);
        board.markACell(rowPosition, columnPosition, getActivePlayer().marker)

        switchActivePlayer();
        printNewRound();
    }

    printNewRound();

    return { switchActivePlayer, getActivePlayer, playRound };
}

let a = GameControler();

console.log("global test")

a.playRound(1, 1);
a.playRound(2, 2);