const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const userHeight = 15
const userWidth = 100
const userStart = [230, 10]
let currentPosition = userStart

const ballRadius = 12.5
const ballStart = [230, 25]
let xDirection = -2
let yDirection = 2
let currentBallPosition = ballStart
let timerid

//create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomright = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    // new Block(10,210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    // new Block(450,210)
]

// draw blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user_block')
drawUser()
grid.appendChild(user)

//draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'

}

// draw the ball
function drawBall() {
    ball.style.left = currentBallPosition[0] + 'px'
    ball.style.bottom = currentBallPosition[1] + 'px'
}


// move user
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;

    }

}

document.addEventListener('keydown', moveUser)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')

grid.appendChild(ball)

//move ball
function moveBall() {
    currentBallPosition[0] += xDirection
    currentBallPosition[1] += yDirection

    // console.log(currentBallPosition[1])
    drawBall()
    checkForCollisions()
}

timerid = setInterval(moveBall, 30)
let score = 0

// check for collisions
function checkForCollisions() {

    if (blocks.length==0){
        clearInterval(timerid)
        document.querySelector("#status").innerHTML = "Game Over"
    }

    //block

    for (let i = 0; i < blocks.length; i++) {
        if (currentBallPosition[0] > blocks[i].bottomLeft[0] && currentBallPosition[0] < blocks[i].bottomright[0]
        && ((currentBallPosition[1] + (ballRadius * 2)) > blocks[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1]))
        {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            console.log(allBlocks)

            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            score++
            document.querySelector("#score").innerHTML=score
            changeDirection()
        }
    }

    //user

    if(currentBallPosition[1] < currentPosition[1] + userHeight){
        changeDirection() 
    }



    //wall
    if (
        currentBallPosition[0] >= (boardWidth - ballRadius * 2)
        ||
        currentBallPosition[1] >= (boardHeight - ballRadius * 2)
        ||
        currentBallPosition[0] <= 0
    ) {
        changeDirection()
    }
    //check for game over
    if (currentBallPosition[1] <= 0) {
        clearInterval(timerid)
        document.querySelector("#status").innerHTML = "You lose"
        document.removeEventListener('keydown', moveUser)

    }

}

function changeDirection() {

    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }

    if (xDirection === 2 && yDirection === -2) {
        console.log("ey")
        xDirection = -2
        return
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }

    if (xDirection === -2 && yDirection === 2) {
        console.log("HERE")
        xDirection = 2
        return
    }

}

moveBall()