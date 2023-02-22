console.log(`this is not good`)

const gameField = document.querySelectorAll('.game')
const para = document.querySelector('p')


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
        gameField.forEach (div => 
            div.classList.remove('winner'))
    }


}




gameField.forEach(btn => {
    btn.addEventListener('click', playGame)
})