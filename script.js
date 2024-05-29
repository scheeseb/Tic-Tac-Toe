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
console.log(gameBoard.board[0])
function checkXWinFor(marker) {
    let fullRow = false
    gameBoard.board.forEach((array) => {
        let hitstatus = 0;
        array.forEach(function () {
            i = 0
            if (array[i] === marker) {
                hitstatus++
            }
            i++
        })
        if(hitstatus === array.length){
            console.log("True")
            return fullRow = true;
        }
    })
}

function setArray0(){
    for(i = 0; i < gameBoard.board[0].length; i++)
    gameBoard.board[0][i] = "x"
}
