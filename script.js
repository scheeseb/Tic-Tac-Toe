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

// factorys
function player(inputtedName, marker) {
    const name = inputtedName.slice(0, 1).toUpperCase() + inputtedName.slice(1);
    let score = 0;
    const symbol = marker;
    const addPoint = function () { score++ }
    const getScore = function () { return score }

    return { name, symbol, getScore, addPoint }
}


const gameBoard = (function (size) {
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
    const boardFull = function () {
        let fullStatus = true;
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board.length; j++){
                if (board[i][j] === 0){
                    fullStatus = false;
                }
            }
        }
        return (fullStatus)
    }
    const placeMarker = function (y, x, marker) {
        if (gameBoard.board[y][x] === 0){
            gameBoard.board[y][x] = marker;
        }
    };

    const reset = (function () {
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board.length; j++){
                board[i][j] = 0;
            }
        }
    })

    return { board, checkWin, boardFull, placeMarker, reset }
})(3);

const ai = (function () {
    const theBoard = gameBoard.board;
    const gameBoardLength = theBoard.length;

    const checkForOpenLanes = function (y, x, playerSymbol) {
        let hits = 0;

        (function checkColoumn(x) {
            let clear = false;
            for (let i = 0; i < gameBoardLength; i++) {
                if (theBoard[i][x] === 0 || theBoard[i][x] === playerSymbol) {
                    clear = true;
                }else{ clear = false}
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
    function blocksAWin(y, x, playerMarker) {
        console.log(isOpenCorner(y,x))
        if (checkForOpenLanes(y, x, playerMarker) < 1 && isOpenCorner(y,x) === false) {
            return true;
        } else {
            return false;
        }
    }
    function isImminentWin(y, x, marker) {

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
    function isOpenMiddle(y, x) {
        if (y === (gameBoardLength - 1) / 2 && x === (gameBoardLength - 1) / 2 && theBoard[y][x] === 0) {
            return true;
        } else { return false }
    }
    function isOpenCorner(y, x) {
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
    function oppositeCornerTaken(y, x) {
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
    function isOpen(y, x) {
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
                    gameBoard.placeMarker(i, j, player2.symbol);
                    return true
                }
            }
        }
        return false;
    }
    const pickBestSpot = function () {
        let opponentMarker = ""
        if (player2.symbol === 'x') {
            opponentMarker = 'o'
        } else {
            opponentMarker = 'x'
        }
        if (hitTargetIf(isImminentWin, player2.symbol)) {
            console.log("Imminent Win")
            return true;
        }
        if (hitTargetIf(isImminentWin, player1.symbol)) {
            console.log("Opponent Imminent Win")
            return true;
        }
        if (hitTargetIf(isOpenMiddle, player2.symbol)) {
            console.log("isOpenMiddle")
            return true;
        }
        // Creates a bridge
        for (let i = 0; i < gameBoardLength; i++) {
            for (j = 0; j < gameBoardLength; j++) {
                if (blocksAWin(i, j, player2.symbol) && isOpen(i, j)) {
                    console.log("Opposite Taken")
                    gameBoard.placeMarker(i, j, player2.symbol);
                    return true
                };
            };
        };
        
        for (let i = 0; i < gameBoardLength; i++) {
            for (j = 0; j < gameBoardLength; j++) {
                if (isOpenCorner(i, j) && oppositeCornerTaken(i, j)) {
                    console.log("Opposite Taken")
                    gameBoard.placeMarker(i, j, player2.symbol);
                    return true
                };
            };
        };
        if (hitTargetIf(isOpenCorner, player2.symbol)) {
            console.log("isOpenCorner")
            return true;
        }
        
        
        if (hitTargetIf(isOpen, player2.symbol)) {
            console.log("isOpen")
            return true;
        }
    };
    return { pickBestSpot }
})();

const displayController = (function (playerMarker = "x") {
    const outerContainer = document.querySelector("#outer-container");
    const theBoard = gameBoard.board;
    const gameBoardLength = theBoard.length

    const updateDisplay = function () {
        const oldContainer = document.querySelector("#container");
        if (oldContainer) {
            outerContainer.removeChild(oldContainer);
        }

        const newContainer = document.createElement('div');
        newContainer.id = "container"
        outerContainer.append(newContainer)


        for (let i = 0; i < gameBoardLength; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = "board-row";

            for (let j = 0; j < gameBoardLength; j++) {
                const playSpaceDiv = document.createElement('div');
                playSpaceDiv.className = 'play-space';
                playSpaceDiv.dataset.y = i;
                playSpaceDiv.dataset.x = j;

                if (theBoard[i][j] === "x") {
                    playSpaceDiv.textContent = 'X';
                } else if (theBoard[i][j] === "o") {
                    playSpaceDiv.textContent = "O"
                } else {
                    playSpaceDiv.textContent = ""
                }
                rowDiv.append(playSpaceDiv);
            }
            newContainer.append(rowDiv)
        }
        outerContainer.append(newContainer)
    };

    const attachListeners = function (marker = player1.symbol) {
       console.log(marker)
        const playSpaces = document.querySelectorAll(".play-space")

        playSpaces.forEach(function (elem) {
            elem.addEventListener("click", function () {
                gameBoard.placeMarker((elem.dataset.y), (elem.dataset.x), marker);
                updateDisplay();
                let newMarker = marker;
                if (player2.name === "Computer"){
                    ai.pickBestSpot();
                    updateDisplay()
                }else {
                    if (marker === "x") { 
                        newMarker = "o"
                    }else {
                        newMarker = "x"
                    }
                }

                if (gameBoard.checkWin(player1.symbol) === true){
                    alert(player1.name + " Wins");
                    player1.addPoint();
                    gameBoard.reset();
                    displayController.updateScoreBoard();
                    displayController.updateDisplay();
                }else
                if (gameBoard.checkWin(player2.symbol)){
                    alert(player2.name + " Wins");
                    player2.addPoint();
                    gameBoard.reset();
                    displayController.updateScoreBoard();
                    displayController.updateDisplay();
                }else
                if (gameBoard.boardFull()){
                    alert("Tie");
                    gameBoard.reset();
                    displayController.updateDisplay();
                }
                attachListeners(newMarker);
            })
        })
    };
    const addPlayerNames = function () {
        const nameCard = document.querySelector("#nameCard");
        nameCard.textContent = player1.name + ": ";

        const playerTwoNameCard = document.querySelector("#computerNameCard");
        playerTwoNameCard.textContent = player2.name + ": ";
    };

    const updateScoreBoard = function () {
        const playerScoreCard = document.querySelector("#scoreCard");
        playerScoreCard.textContent = player1.getScore();

        const ScoreCard = document.querySelector("#computerScoreCard");
        ScoreCard.textContent = player2.getScore();
    }

    return { updateDisplay, attachListeners, addPlayerNames, updateScoreBoard}
})();

const form = document.querySelector("#player-form");
let player1 = {};
let player2 = {};

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const popup = document.querySelector("body > div.pop-up");
    const formData = new FormData(form);
    const playerName = formData.get('name');
    const playerTwoNameIn = formData.get('player2');
    const playerSymbolInput = formData.get('symbol');
    const playerCountInput = formData.get('playerCount');
    let playerSymbol = "x";
    
    let playerTwoSymbol = "o";
    
    if (playerSymbolInput === "on"){
        playerSymbol = "o"
        playerTwoSymbol = "x"
    }

    if (playerCountInput === "on") {
        playerCount++
    }

    if (playerTwoNameIn) {
        playerTwoName = playerTwoNameIn;
    }else {
        playerTwoName = "Computer"
    }

    player1 = player(playerName, playerSymbol);
    player2 = player(playerTwoName, playerTwoSymbol);
    displayController.addPlayerNames();
    popup.style.display = "none";
    displayController.updateDisplay()
    displayController.attachListeners(player1.symbol)
})