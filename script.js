function createPlayer(inputtedName) {
    const name = inputtedName.slice(0, 1).toUpperCase() + inputtedName.slice(1);
    let score = 0;
    const addPoint = function () { score++ }
    const getScore = function () { return score }

    return { name, getScore, addPoint }
}

const gameBoard = (function createGameBoard(size) {
    const board = [];
    for (i = 0; i < size; i++) {
        const boardRow = []
        for (s = 0; s < size; s++) {
            boardRow.push(0);
        }
        board.push(boardRow);
    }
    // Status Functions
    const checkForWin = function checkForWin(marker) {
        const theBoard = gameBoard.board;
        const gameBoardLength = gameBoard.board.length;
        let winner = false;
        // check all horizontal matches
        (function checkX() {
            gameBoard.board.forEach(function (array) {
                let hitStatus = 0;

                array.forEach(function (mark) {
                    if (mark === marker) {
                        hitStatus++;
                    }
                })
                if (hitStatus === array.length) {
                    winner = true;
                }
            })
        })();
        // 
        // Check Vertical for matches
        (function checkY() {

            for (i = 0; i < gameBoardLength; i++) {
                let hitStatus = 0;
                for (j = 0; j < gameBoardLength; j++) {
                    if (gameBoard.board[j][i] === marker) {
                        hitStatus++
                    }
                    if (hitStatus === gameBoardLength) {
                        winner = true;
                    }
                }
            }
        })();
        //
        // Check for diagonal matches
        (function checkDiag() {
            // Top left to bottom right
            let hitStatusT = 0;
            for (i = 0; i < gameBoardLength; i++) {
                if (gameBoard.board[i][i] === marker) {
                    hitStatusT++;
                }
            }
            if (hitStatusT === gameBoardLength) {
                winner = true;
            }
            let hitStatusB = 0;
            // Bottom Left to Top right
            for (i = 0; i < gameBoardLength; i++) {
                if (gameBoard.board[gameBoardLength - i - 1][i] === marker) {
                    hitStatusB++
                }
            }
            if (hitStatusB === gameBoardLength) {
                winner = true;
            }
        })();
        return (winner);
    }
    const fullBoard = function boardFull() {
        let fullStatus = true;
        gameBoard.board.forEach(function (array) {
            array.forEach(function (mark) {
                if (mark === 0) {
                    fullStatus = false;
                }
            })
        })
        return (fullStatus)
    }

    return { board, checkForWin, fullBoard}
})(3);

const ai = function () {
    const theBoard = gameBoard.board;
    const gameBoardLength = theBoard.length;
    
    const checkForOpenLanes = function (y, x) {
        let hits = 0;
        (function lookRight(y, x) {
            let clear = true;
            for (let i = 0; i < gameBoardLength; i++) {
                if (x <= gameBoardLength && theBoard[y][x] === 0) {
                    x++;
                } else {
                    clear = false;
                }
            }
            if (clear === true){
                hits++;
                console.log("Right")
            }
        })(y,x);

        (function lookLeft(y, x) {
            let clear = true;
            for (let i = 0; i < gameBoardLength; i++) {
                if ( x >= 0 && theBoard[y][x] === 0) {
                    x--;
                } else {
                    clear = false;
                }
            }
            if (clear === true){
                hits++;
                console.log("Left")
            }
        })(y,x);

        (function lookUp(y, x) {
            let clear = true;
            for (let i = 0; i < gameBoardLength; i++) {
                if ( y >= 0 && theBoard[y][x] === 0) {
                    y--;
                } else {
                    clear = false;
                }
            }
            if (clear === true){
                hits++;
                console.log("Up")
            }
            console.log(clear)
        })(y,x);

        (function lookDown(y, x) {
            let clear = true;
            for (let i = 0; i < gameBoardLength; i++) {
                if ( y < gameBoardLength && theBoard[y][x] === 0) {
                    y++;
                } else {
                    clear = false;
                }
            }
            if (clear === true){
                hits++;
                console.log("Down")
            }
        })(y,x);

        return (hits);
    }
    return {checkForOpenLanes}
}










// debugging junk
function setArrayX() {
    for (i = 0; i < gameBoard.board[0].length; i++) {
        gameBoard.board[0][i] = "x"
    }
}
function setArrayY() {
    for (i = 0; i < gameBoard.board[0].length; i++) {
        gameBoard.board[i][1] = "x"
    }

}
function setArrayDiag() {
    for (i = 0; i < gameBoard.board[0].length; i++)
        gameBoard.board[i][i] = "x"
}
function fillBoard() {
    for (i = 0; i < gameBoard.board.length; i++) {
        for (j = 0; j < gameBoard.board.length; j++) {
            gameBoard.board[i][j] = "o"
        }
    }
}
// useless Calls
console.log(gameBoard.board)

