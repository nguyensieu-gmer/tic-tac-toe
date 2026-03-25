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