function createPlayer(inputtedName) {
    const name = inputtedName.slice(0, 1).toUpperCase() + inputtedName.slice(1);
    let score = 0;
    const addPoint = function () { score++ }
    const getScore = function () { return score }

    return { name, getScore, addPoint }
}

const gameBoard = (function createGameBoard(size) {
    // creates gameBoard
    const board = [];
    const createBoard = (function () {
        for (i = 0; i < size; i++) {
            const boardRow = []
            for (s = 0; s < size; s++) {
                boardRow.push(0);
            }
            board.push(boardRow);
        }
    })()
    // Status Functions
    const checkWin = function (marker) {
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
    const checkFullBoard = function () {
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
    const placeMarker = function (y, x, marker) {
        gameBoard.board[y][x] = marker;
    };

    return { board, checkWin, checkFullBoard, placeMarker }
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
                if (theBoard[y][i] !== 0) {
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
                if (gameBoard.board[i][i] !== 0) {
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
                if (gameBoard.board[gameBoardLength - i - 1][i] !== 0) {
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
    function createsABridge (y, x) {
        if (checkForOpenLanes(y, x) > 1) {
            return true;
        } else {
            return false;
        }
    }
    function isImminentWin (y, x, marker) {

        let winImminent = false;

        function checkColumn(x) {
            let marks = 0;
            for (let i = 0; i < gameBoardLength; i++) {
                if (theBoard[i][x] === marker) {
                    marks++
                } else if (theBoard[i][x] !== 0) {
                    return false
                }
            }
            return marks === gameBoardLength - 1;
        };
        function checkRow(y) {
            let marks = 0;

            for (let i = 0; i < gameBoardLength; i++) {
                if (theBoard[y][i] === marker) {
                    marks++
                } else if (theBoard[y][i] !== 0) {
                    return false
                }
            }
            return marks === gameBoardLength - 1;
        }
        function checkDiagT(y, x) {
            let marks = 0;
            let onDiag = false;

            for (let i = 0; i < gameBoardLength; i++) {
                if (i === x && i === y) {
                    onDiag = true
                }
                if (gameBoard.board[i][i] === marker) {
                    marks++
                } else if (gameBoard.board[i][i] !== 0) {
                    return false
                }
            }
            return marks === gameBoardLength - 1 && onDiag;
        }
        function checkDiagB(y, x) {
            let marks = 0;
            let onDiag = false;

            for (let i = 0; i < gameBoardLength; i++) {
                if ((gameBoardLength - i - 1) === x && i === y) {
                    onDiag = true
                }
                if (gameBoard.board[gameBoardLength - i - 1][i] === marker) {
                    marks++
                } else if (gameBoard.board[gameBoardLength - i - 1][i] !== 0) {
                    return false
                }
            }
            return marks === gameBoardLength - 1 && onDiag;
        }

        if (checkColumn(x) || checkRow(y) || checkDiagT(y, x) || checkDiagB(y, x)) {
            winImminent = true;
        }

        return (winImminent)
    }
    function isOpenMiddle (y, x) {
        if (y === (gameBoardLength - 1) / 2 && x === (gameBoardLength - 1) / 2 && theBoard[y][x] === 0) {
            return true;
        } else { return false }
    }
    function isOpenCorner (y, x) {
        //These are all the corners on any board
        const cornerA = [0, 0];
        const cornerB = [0, (gameBoardLength - 1)];
        const cornerC = [(gameBoardLength - 1), 0];
        const cornerD = [(gameBoardLength - 1), (gameBoardLength - 1)];



        if (theBoard[y][x] !== 0) {
            return false;
        }
        if (y === cornerA[0] && x === cornerA[1]) {
            return true;
        } else if (y === cornerB[0] && x === cornerB[1]) {
            console.log("corner B")
            return true;
        } else if (y === cornerC[0] && x === cornerC[1]) {
            console.log("corner C")
            return true;
        } else if (y === cornerD[0] && x === cornerD[1]) {
            console.log("corner D")
            return true;
        } else {
            return false;
        }
    }
    function oppositeCornerTaken (y, x) {
        const cornerA = [0, 0];
        const cornerB = [0, (gameBoardLength - 1)];
        const cornerC = [(gameBoardLength - 1), 0];
        const cornerD = [(gameBoardLength - 1), (gameBoardLength - 1)];


        if (theBoard[y][x] !== 0) {
            return false;
        }

        if (y === cornerA[0] && x === cornerA[1]) {
            if (theBoard[cornerD[0]][cornerD[1]] !== 0) {
                console.log("Im A. D us taken")
                return true
            } else {
                return false
            }
        } else if (y === cornerB[0] && x === cornerB[1]) {
            if (theBoard[cornerC[0]][cornerC[1]] !== 0) {
                console.log("Im B. C us taken");
                return true
            }
        } else if (y === cornerC[0] && x === cornerC[1]) {
            if (theBoard[cornerB[0]][cornerB[1]] !== 0) {
                console.log("Im C. B us taken");
                return true
            }
        } else if (y === cornerD[0] && x === cornerD[1]) {
            if (theBoard[cornerA[0]][cornerA[1]] !== 0) {
                console.log("Im D. A us taken");
                return true
            }
        } else {
            return false;
        }

    }
    function isOpen (y, x) {
        if (theBoard[y][x] === 0) {
            return true;
        } else {
            return false;
        }
    }
    function hitTargetIf(callback, marker) {
        for (let i = 0; i < gameBoardLength; i++) {
            for (let j = 0; j < gameBoardLength; j++) {
                if (callback(i, j, marker) && isOpen(i, j)) {
                    gameBoard.placeMarker(i, j, marker);
                    return true
                }
            }
        }
        return false;
    }
    const pickBestSpot = function (marker) {
        let opponentMarker = ""
        if (marker === 'x'){
            opponentMarker = 'o'
        }else{
            opponentMarker = 'x'
        }
        if (hitTargetIf(isImminentWin, marker)){
            console.log("Imminent Win")
            return true;
        } 
        if (hitTargetIf(isImminentWin, opponentMarker)){
            console.log("Opponent Imminent Win")
            return true;
        } 
        if (hitTargetIf(isOpenMiddle, marker)){
            console.log("isOpenMiddle")
            return true;
        }
        for (let i = 0; i < gameBoardLength; i++) {
            for (j = 0; j < gameBoardLength; j++) {
                if (isOpenCorner(i, j) && oppositeCornerTaken(i, j)) {
                    console.log("Opposite Taken")
                    gameBoard.placeMarker(i, j, marker);
                    return true
                };
            };
        };
        if (hitTargetIf(isOpenCorner, marker)){
            console.log("isOpenCorner")
            return true;
        }
        if (hitTargetIf(createsABridge, marker)){
            console.log("createsABridge")
            return true;
        }
        if (hitTargetIf(isOpen, marker)) {
            console.log("isOpen")
            return true;
        }
    };
    return {pickBestSpot}
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

