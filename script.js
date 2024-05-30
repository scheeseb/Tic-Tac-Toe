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
            boardRow.push(0)
        }
        board.push(boardRow)
    }

    const checkForWin = function checkForWin(marker) {
        const gameBoardLength = gameBoard.board.length;
    
        // check all horizontal matches
        (function checkX() {
            gameBoard.board.forEach(function (array) {
                let hitStatus = 0;
    
                array.forEach(function (mark) {
                    if (mark === marker) {
                        hitStatus++
                    }
                })
    
                if (hitStatus === array.length) {
                    console.log("True X axis")
                    return true;
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
                        return true;
                    }
                }
            }
        })();
        //
        // Check for diagonal matches
        (function checkDiag() {
            let hitStatusT = 0;
            for (i = 0; i < gameBoardLength; i++) {
                if (gameBoard.board[i][i] === marker) {
                    hitStatusT++;
                }
            }
            if (hitStatusT === gameBoardLength) {
                return true;
            }
            let hitStatusB = 0;
            // Bottom Left to Top right
            for (i = 0; i < gameBoardLength; i++) {
                if (gameBoard.board[gameBoardLength - i - 1][i] === marker) {
                    hitStatusB++
                }
            }
            if (hitStatusB === gameBoardLength) {
                return true;
            }else {return false}
        })();
    }

    return { board, checkForWin }

})(3)
console.log(gameBoard.board)


function checkForWin(marker) {
    const gameBoardLength = gameBoard.board.length;

    // check all horizontal matches
    (function checkX() {
        gameBoard.board.forEach(function (array) {
            let hitStatus = 0;

            array.forEach(function (mark) {
                if (mark === marker) {
                    hitStatus++
                }
            })

            if (hitStatus === array.length) {
                console.log("True X axis")
                return true;
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
                    console.log('True Y axis');
                    return true;
                } else if(i === gameBoardLength){
                    return false
                }
            }
        }
    })();
    //
    // Check for diagonal matches
    (function checkDiag() {
        let hitStatusT = 0;
        for (i = 0; i < gameBoardLength; i++) {
            if (gameBoard.board[i][i] === marker) {
                hitStatusT++;
            }
        }
        if (hitStatusT === gameBoardLength) {
            return true;
        }
        let hitStatusB = 0;
        // Bottom Left to Top right
        for (i = 0; i < gameBoardLength; i++) {
            if (gameBoard.board[gameBoardLength - i - 1][i] === marker) {
                hitStatusB++
            }
        }
        if (hitStatusB === gameBoardLength) {
            return true;
        }else {return false}
    })();
}



// debugging junk
function setArrayX() {
    for (i = 0; i < gameBoard.board[0].length; i++)
        gameBoard.board[0][i] = "x"
}
function setArrayY() {
    for (i = 0; i < gameBoard.board[0].length; i++)
        gameBoard.board[i][1] = "x"
}
function setArrayDiag() {
    for (i = 0; i < gameBoard.board[0].length; i++)
        gameBoard.board[i][i] = "x"
}

