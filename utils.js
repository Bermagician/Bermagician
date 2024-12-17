function rectangularColision({rectangle1, rectangle2}) {
    return(
rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
rectangle2.position.x && 
rectangle1.attackBox.position.x <= 
rectangle2.position.x + rectangle2.width &&
rectangle1.attackBox.position.y + rectangle1.attackBox.height >= 
rectangle2.position.y && 
rectangle1.attackBox.position.y <= 
rectangle2.position.y + rectangle2.height
)
}

function DetermineWinner ({player, enemy, timerId}) {
    clearTimeout(timerId)
     if (player.Health < enemy.Health) {
    document.querySelector("#displayText").innerHTML = "player 2 WINS"
    }else if (player.Health > enemy.Health) {
    document.querySelector("#displayText").innerHTML = "player 1 WINS"
    }else{
    document.querySelector("#displayText").innerHTML = "TIE"    
    }
    document.querySelector("#displayText").style.display = "flex"
}

let timer = 61
let timerId

function DecreaseTimer() {
    if (timer > 0) {
    timerId = setTimeout(DecreaseTimer, 1000)
        timer --
        document.querySelector("#timer").innerHTML = timer
    }else{
    DetermineWinner({player, enemy, timerId})
    }
}