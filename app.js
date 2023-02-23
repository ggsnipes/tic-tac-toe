console.log(`this is not good`)

//setting all the variables that need to be defined for pressing buttons
const gameField = document.querySelectorAll('.game')
const paraWinner = document.querySelector('.winner')
const paraTurn = document.querySelector('.turn')
const player1Class = 'x'
const player2Class = 'circle'
const board = document.getElementsByClassName('board')
const restartBtn = document.querySelector('.restart')
let isPlayer2Turn = false
let player1Score = 0
let player2Score = 0

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
        box.classList.remove(player1Class)
        box.classList.remove(player2Class)
        box.removeEventListener('click', handleGameClick)
        box.addEventListener('click', handleGameClick, {once: true})
    })
    //setBoardHoverClass()
    paraWinner.textContent = ''
    paraTurn.textContent = "It is X's turn"
}

//handling the clicks and turns

function handleGameClick(event) {
    let div = event.target
    const currentClass = isPlayer2Turn ? player2Class : player1Class
    
    placeMark(div, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        paraTurn.textContent = `It is ${isPlayer2Turn ? "X's" : "O's"} turn`
        swapTurns()
        //setBoardHoverClass()
    }
}



//ending the game and it's requirements

function endGame(draw) {
    if (draw) {
        paraWinner.textContent = "It's a draw"
        paraTurn.textContent = `Game Over`
    } else {
        paraTurn.textContent = `Game Over`
        paraWinner.textContent = `Player with ${isPlayer2Turn ? "O's" : "X's"} wins`
    }
}

//draw function when it's a draw

function isDraw() {
    return [...gameField].every(box => {
        return box.classList.contains(player1Class) || box.classList.contains(player2Class)
    })
}


//placing the icons down when clicked

function placeMark (div, currentClass) {
    div.classList.add(currentClass)
}



//give a hovering effect to the tiles
// function setBoardHoverClass () {
//     board.classList.remove(player1Class)
//     board.classList.remove(player2Class)
//     if (isPlayer2Turn) {
//         board.classList.add(player2Class)
//     } else {
//         board.classList.add(player1Class)
//     }
// }


//swap turns

function swapTurns() {
    isPlayer2Turn = !isPlayer2Turn
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
//         paraWinner.textContent = `You are a winner!!`
//         gameField.forEach (div => 
//             div.classList.add('winner'))
//     } else {
//         paraWinner.textContent = ''
//         gameField.forEach (div => 
//             div.classList.remove('winner'))
//     }


// }


//starts the game
gameStart()




//restarts the game
restartBtn.addEventListener('click', gameStart)



// restartBtn.addEventListener('click', )

// gameField.forEach(btn => {
//     btn.addEventListener('click', playGame)
// })