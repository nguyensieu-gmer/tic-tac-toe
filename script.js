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

    const markACell = (row, column, mark) => {
        if (board[row][column].getValue() !== 0) return;
        board[row][column].addMark(mark);
    }

    const printBoard = () => {
        const boardWithCellValue = getBoard().map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCellValue);
    }

    return { getBoard, markACell, printBoard };
}

function gameChecker(){

    const checkFull = (board) => {
        for (let row = 0; row < 3; row++){
            for (let column = 0; column < 3; column++){
                if (board[row][column].getValue() === 0){
                    return false;
                }
            }
        }
        return true;
    };

    const checkRow = (row, board, marker) => {
        for (let column = 0; column < 3; column++){
            if (board[row][column].getValue() !== marker){
                return false
            }
        }
        return true;
    }

    const checkColumn = (column, board, marker) => {
        for (let row = 0; row < 3; row++){
            if (board[row][column].getValue() !== marker){
                return false;
            }
        }
        return true  
    }

    const checkMainDiagon = (row, column, board, marker) => {
        if (column + row !== 2) return false;
        for (let i = 0, j = 2; i < 3 && j >= 0; i++, j--){
            if (board[i][j].getValue() !== marker){
                return false;
            }
        }
        return true;
    }

    const checkAxisDiagon = (row, column, board, marker) => {
        if (row !== column) return false;
        for (let i = 0; i < 3; i++){
            if (board[i][i].getValue() !== marker){
                return false;
            }   
        }
        return true;
    }
    
    const checkWin = (row, column, board, marker) => {
        if (
            checkRow(row, board, marker) ||
            checkColumn(column, board, marker) || 
            checkMainDiagon(row, column, board, marker) ||
            checkAxisDiagon(row, column, board, marker)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    return { checkWin, checkFull };
}   

// switch player each round
// get current turn of player
// play a round with position in grid
function GameControler(player1 = "Player1", player2 = "Player2"){
    const board = GameBoard();
    const check = gameChecker();

    const player = [
        {name: player1, marker: "X"},
        {name: player2, marker: "O"}
    ]

    let activePlayer = player[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === player[0] ? player[1] : player[0];
    }

    const printNewRound = () => {
        console.log(`Now is ${getActivePlayer().name} turn`);
        board.printBoard();
    }

    const playRound = (rowPosition, columnPosition) => {
        console.log(`${getActivePlayer().name} choose (${rowPosition}, ${columnPosition}) position`);
        board.markACell(rowPosition, columnPosition, getActivePlayer().marker);

        printNewRound();

        if (check.checkWin(rowPosition, columnPosition, board.getBoard(), activePlayer.marker)){
            console.log(`${activePlayer.name} win`);
            return;
        }

        if (check.checkFull(board.getBoard())){
            console.log("it is a ties");
            return;
        }

        switchActivePlayer();
    }

    printNewRound();

    return { switchActivePlayer, getActivePlayer, playRound };
}