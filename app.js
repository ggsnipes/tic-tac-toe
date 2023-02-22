console.log(`this is not good`)

//setting all the variables that need to be defined for pressing buttons
const gameField = document.querySelectorAll('.game')
const para = document.querySelector('p')
const player1 = 'cross'
const player2 = 'circle'
const board = document.getElementsByClassName('board')
const restartBtn = document.getElementsByClassName('restart')
let isPlayer2Turn = false
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


//start of the game function, can also be used for resetting the game

function gameStart () {
    isPlayer2Turn = false
    gameField.forEach(box => {
        box.classList.remove(player1)
        box.classList.remove(player2)
        box.removeEventListener('click', handleGameClick)
        box.addEventListener('click', handleGameClick, {once: true})
    })
    setBoardHoverClass()
    para.textContent = ''
}


//handling the clicks and turns

function handleGameClick(event) {
    let div = event.target
    const currentClass = isPlayer2Turn ? player2 : player1
    placeMark(div, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}



//ending the game and it's requirements

function endGame(draw) {
    if (draw) {
        para.textContent = "It's a draw"
    } else {
        para.textContent = `Player with ${isPlayer2Turn ? "O's" : "X's"} wins`
    }
}

//draw function when it's a draw

function isDraw() {
    return [...gameField].every(box => {
        return box.classList.contains(player1) || clearInterval.classList.contains(player2)
    })
}

//placing the icons down when clicked

function placeMark (div, currentClass) {
    div.classList.add(currentClass)
}

//swap turns

function swapTurns() {
    isPlayer2Turn = !isPlayer2Turn
}


//give a hovering effect to the tiles
function setBoardHoverClass () {
    board.classList.remove(player1)
    board.classList.remove(player2)
    if (isPlayer2Turn) {
        board.classList.add(player2)
    } else {
        board.classList.add(player1)
    }
}

//check win conditions
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => { 
            return gameField[index].classList.contains(currentClass)
        })
    })
}







// function playGame (event) {
//     let div = event.target

//     if (div.classList.contains('click')) {
//         div.classList.remove('click')
//     } else {
//         div.classList.add('click')
//     }

//     if (document.querySelectorAll('.click').length == 3) {
//         para.textContent = `You are a winner!!`
//         gameField.forEach (div => 
//             div.classList.add('winner'))
//     } else {
//         para.textContent = ''
//         gameField.forEach (div => 
//             div.classList.remove('winner'))
//     }


// }




// restartBtn.addEventListener('click', )

gameField.forEach(btn => {
    btn.addEventListener('click', playGame)
})