//setting all the variables that need to be defined for pressing buttons
const gameField = document.querySelectorAll('.game')
const paraWinner = document.querySelector('.winner')
const paraTurn = document.querySelector('.turn')
const player1Class = 'x'
const player2Class = 'circle'
const board = document.getElementsByClassName('board')
const restartBtn = document.querySelector('.restart')
const score = document.querySelector('.score')
const cpuPlayBtn = document.querySelector('.cpu-play')
let isPlayer2Turn = false
let player1Score = 0
let player2Score = 0
let cpuPlaying = false

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


// function cpuPlayTurn() {
//     let cpuChoice = Math.floor(Math.random() * 9 )
//     cpuPlaying = true

//     while(cpuPlaying){
//         if (isPlayer2Turn == true){
//             if (gameField[cpuChoice] != player1Class) {
//                 gameField[cpuChoice].classList.add(player2Class)
//                 swapTurns()
//             } else {
//                 return null
//             }
//         }
//     }


// }



//start of the game function, can also be used for resetting the game

function gameStart () {
    isPlayer2Turn = false
    gameField.forEach(box => {
        box.classList.remove(player1Class)
        box.classList.remove(player2Class)
        box.classList.remove('game-over')
        box.removeEventListener('click', handleGameClick)
        box.addEventListener('click', handleGameClick, {once: true})
    })
    paraWinner.textContent = ''
    paraTurn.textContent = "It is X's turn"
    score.textContent = `X: ${player1Score} || O: ${player2Score}`
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
    }
}



//ending the game and it's requirements

function endGame(draw) {
    if (draw) {
        paraWinner.textContent = "It's a draw"
        paraTurn.textContent = `Game Over`
        gameField.forEach(box => {
            box.removeEventListener('click', handleGameClick)
            box.classList.add('game-over')
        })
    } else {
        paraTurn.textContent = `Game Over`
        paraWinner.textContent = `Player with ${isPlayer2Turn ? "O's" : "X's"} wins`
        gameField.forEach(box => {
            box.removeEventListener('click', handleGameClick)
            box.classList.add('game-over')
        })
    }


    //keeping track of the score by checking who won and who's turn it was on.
    if (draw) {
        score.textContent = `X: ${player1Score} || O: ${player2Score}`
    } else if (!isPlayer2Turn) {
        player1Score++
        score.textContent = `X: ${player1Score} || O: ${player2Score}`
    } else {
        player2Score++
        score.textContent = `X: ${player1Score} || O: ${player2Score}`
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


//swap turns

function swapTurns() {
    isPlayer2Turn = !isPlayer2Turn
}


//testing out the hoverover function
// function aimSquare() {
//     if (isPlayer2Turn) {
//         gameField.classList.add('grayx')
//     } else {
//         gameField.classList.add('grayCircle')
//     }
// }



//check win conditions
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => { 
            return gameField[index].classList.contains(currentClass)
        })
    })
}




//starts the game
gameStart()



//testing mouseover and seeing if it works.

// gameField.forEach(hover => {
//     hover.addEventListener('mousedown', aimSquare)
// })


//restarts the game
restartBtn.addEventListener('click', gameStart)
cpuPlayBtn.addEventListener('click', cpuPlayTurn)
