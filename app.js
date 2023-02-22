console.log(`this is not good`)

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






function playGame (event) {
    let div = event.target

    if (div.classList.contains('click')) {
        div.classList.remove('click')
    } else {
        div.classList.add('click')
    }

    if (document.querySelectorAll('.click').length == 3) {
        para.textContent = `You are a winner!!`
        gameField.forEach (div => 
            div.classList.add('winner'))
    } else {
        para.textContent = ''
        gameField.forEach (div => 
            div.classList.remove('winner'))
    }


}




// restartBtn.addEventListener('click', )

gameField.forEach(btn => {
    btn.addEventListener('click', playGame)
})