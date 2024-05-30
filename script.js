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
    return { board }

})(3)
console.log(gameBoard.board)


function checkForWin(marker) {
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

        for (i = 0; i < gameBoard.board.length; i++) {
            let hitStatus = 0;
            for (j = 0; j < gameBoard.board.length; j++) {
                if (gameBoard.board[j][i] === marker) {
                    hitStatus++
                }
                if (hitStatus === gameBoard.board.length) {
                    console.log('True Y axis')
                }
            }
        }
    })();
    //
    // Check for diagonal matches
    (function checkDiag() {

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

