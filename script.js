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

    return { board, checkForWin, fullBoard }
})(3);

const ai = function () {
    const theBoard = gameBoard.board;
    const gameBoardLength = theBoard.length;

    const checkForOpenLanes = function (y, x) {
        let hits = 0;

        (function checkColoumn(x) {
            let clear = true;
            for (let i = 0; i < gameBoardLength; i++) {
                if (theBoard[i][x] !== 0) {
                    clear = false;
                }
            }
            if (clear === true) {
                hits++;
                console.log("Coloumn")
            }
        })(x);
        (function checkRow(y) {
            let clear = true;
            for (let i = 0; i < gameBoardLength; i++) {
                if (theBoard[y][i] != 0) {
                    clear = false;
                }
            }
            if (clear === true) {
                hits++;
                console.log("Row")
            }
        })(y);
        (function checkDiag(y, x) {
            let clearT = true;
            let onDiagT = false;
            for (i = 0; i < gameBoardLength; i++) {
                if (i === x && i === y) {
                    onDiagT = true
                }
                if (gameBoard.board[i][i] != 0) {
                    clearT = false;
                }
            }
            if (clearT === true && onDiagT === true) {
                hits++;
                console.log("DiagT")
            }

            let clearB = true;
            let onDiagB = false;
            for (i = 0; i < gameBoardLength; i++) {
                if (i === x && gameBoardLength - i - 1 === y) {
                    onDiagB = true
                }
                if (gameBoard.board[gameBoardLength - i - 1][i] != 0) {
                    clearB = false;
                }
            }
            if (clearB === true && onDiagB === true) {
                hits++;
                console.log("DiagB")
            }
        })(y, x)

        return (hits);
    }
    const winImminent = function (y, x, marker) {

        let winImminent = false;

        (function checkColoumn(x) {
            let marks = 0;
            for (let i = 0; i < gameBoardLength; i++) {
                if (theBoard[i][x] === marker) {
                    marks++
                } else if (theBoard[i][x] != 0) {
                    return (winImminent = false)
                }
            }
            if (marks === gameBoardLength - 1) {
                return (winImminent = true)
            } else {
                return (winImminent = false)
            }
        })(x);
        (function checkColoumn(y) {
            let marks = 0;

            for (let i = 0; i < gameBoardLength; i++) {
                if (theBoard[y][i] === marker) {
                    marks++
                } else if (theBoard[y][i] != 0) {
                    return (winImminent = false)
                }
            }
            if (marks === gameBoardLength - 1) {
                return (winImminent = true)
            } else {
                return (winImminent = false)
            }
        })(y);
        (function checkDiagT(y, x) {
            let marks = 0;
            let onDiagT = false;

            for (i = 0; i < gameBoardLength; i++) {
                if (i === x && i === y) {
                    onDiagT = true
                }
                if (gameBoard.board[i][i] === marker) {
                    marks++
                } else if (gameBoard.board[i][i] != 0) {
                    return (winImminent = false)
                }
            }
            if (marks === (gameBoardLength - 1) && onDiagT === true) {
                return (winImminent = true)
            } else {
                return (winImminent = false)
            }
        })(y, x);
        (function checkDiagB(y, x) {
            let marks = 0;
            let onDiag = false;

            for (i = 0; i < gameBoardLength; i++) {
                if ((gameBoardLength - i - 1) === x && i === y) {
                    onDiag = true
                }
                if (gameBoard.board[gameBoardLength - i - 1][i] === marker) {
                    marks++
                } else if (gameBoard.board[gameBoardLength - i - 1][i] != 0) {
                    return (winImminent = false)
                }
            }
            if (marks === (gameBoardLength - 1) && onDiag === true) {
                return (winImminent = true)
            } else {
                return (winImminent = false)
            }
        })(y, x);
            

        return (winImminent)
    }

    return { checkForOpenLanes, winImminent }
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
function hitTarget(y, x) {
    gameBoard.board[y][x] = "x"
}
// useless Calls
console.log(gameBoard.board)

