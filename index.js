const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=1350
canvas.height=600

ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)

const gravity = 0.7;
const velocity = 5;
const altJump = 10;

const background = new Sprite({
    position:{
        x:0,
        y:0,
    },
    imageSrc:"./img/background/background.png",
    scale:1.4,
    frameMax:3,
    framesHold:10,
});

const spectator = new Sprite({
    position:{
        x:900,
        y:365,
    },
    imageSrc:"./img/background/pixilart-sprite-slime.png",
    scale:1,    
    frameMax:5,
    framesHold:5,
})

const player = new fighter({
    damage:1,
    position:{
    x: 100,
    y: 0
    },
    velocity:{
    x: 0,
    y: 0
    }, 
    offset:{
    x:0,
    y:0,
    },
    imageSrc:"img/ind/Vibe.png",
    scale:5,
    frameMax:3,
    framesHold:10,
    fit:{
    x:20,
    y:0,
    },
    sprites:{
        idle:{
        imageSrc:"img/ind/Idle.png",
        frameMax:2,
        },
        run:{
        imageSrc:"img/ind/Walk3.png",
        frameMax:2,
        },
        jump:{
        imageSrc:"img/ind/Jump3.png",
        frameMax:1,
        },
        fall:{
        imageSrc:"img/ind/Fall.png",
        frameMax:1,
        },
        atack:{
        imageSrc:"img/ind/Boxer2.png",
        frameMax:3,
        },
        takehit:{
        imageSrc:"img/ind/takehit.png",
        frameMax:3,
        },
        death:{
        imageSrc:"img/ind/death.png",
        frameMax:9,
        },
    },
    attackBox:{
        offset:{
            x:50,
            y:70,
        },
        width:20,
        height:20,
    },
});
player.draw();

const enemy = new fighter({
    damage:1,
    position:{
     x: 1200,
     y: 0
},
    velocity:{
     x: 10,
     y: 10,
},
    offset:{
        x:-20,
        y:0,
},
imageSrc:"img/vil/Idle.png",
scale:5,
frameMax:2,
framesHold:10,
fit:{
x:40,
y:0,
},
sprites:{
    idle:{
    imageSrc:"img/vil/Idle.png",
    frameMax:2,
    },
    run:{
    imageSrc:"img/vil/Walk.png",
    frameMax:2,
    },
    jump:{
    imageSrc:"img/vil/Jump.png",
    frameMax:1,
    },
    fall:{
    imageSrc:"img/vil/Fall.png",
    frameMax:2,
    },
    atack:{
    imageSrc:"img/vil/Boxer2.png",
    frameMax:3,
    },
      takehit:{
        imageSrc:"img/vil/takehit.png",
        frameMax:3,
        },
        death:{
        imageSrc:"img/vil/death0.1.png",
        frameMax:9,
        },
    },
    attackBox:{
        offset:{
            x:-20,
            y:70,
        },
        width:20,
        height:20,
    },
});
enemy.draw();

const keys ={
    a:{
    pressed: false,
    },
    d:{
    pressed: false,
    },
    w:{
    pressed: false,
    },
    ArrowLeft:{
    pressed: false,
    },
    ArrowRight:{
    pressed: false,
    },
    ArrowUp:{
    pressed: false,
    }
}

DecreaseTimer()

function animate() {
    background.update()
    window.requestAnimationFrame(animate)
    spectator.update()
    player.update()
    enemy.update()
  

    player.velocity.x = 0
    enemy.velocity.x = 0 

    
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x -= velocity
    player.switchSprites("run")
    }else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = velocity
    player.switchSprites("run")
    }else{
    player.switchSprites("idle")
    }
    if (player.velocity.y < 0) {
    player.switchSprites("jump")
   
    }else if (player.velocity.y > 0){
        player.switchSprites("fall")
    }
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x -= velocity
        enemy.switchSprites("run")
    }else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = velocity
        enemy.switchSprites("run")
    }else{
        enemy.switchSprites("idle")
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprites("jump")
        }else if (enemy.velocity.y > 0){
            enemy.switchSprites("fall")
        }

   if (
        rectangularColision({
            rectangle1:player,
            rectangle2:enemy
        })&&
        player.isAttacking && player.caunt === 1 && player.lastKey === 's'
) {
    enemy.takehit()

    document.querySelector("#enemyHealt").style.width = enemy.Health + "%"
    }
   if (
        rectangularColision({
            rectangle1:enemy,
            rectangle2:player
        })&&
        enemy.isAttacking && enemy.caunt === 1 && enemy.lastKey === "ArrowDown"
) {
    player.takehit()

    document.querySelector("#playerHealt").style.width= player.Health + "%"
}    
    // end game healt 
    if (enemy.Health <= 0 || player.Health <= 0) {
        DetermineWinner({player, enemy, timerId})
    }
 }

animate()

window.addEventListener("keydown", (event) => {
    if (!player.death){
    switch (event.key) {
        case "d":
            keys.d.pressed = true
            player.lastKey = "d"
            break;
    
        case "a":
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case "w":
             if (player.velocity.y === 0) {
                player.velocity.y -= altJump
             }
                break;
        case 's':
           setTimeout(() => {
             player.lastKey="s"
             player.atack()
           }, 100);
                break;
    }
}
        if (!enemy.death){
    switch (event.key) {
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            enemy.lastKey = "ArrowRight"
            break;
    
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case "ArrowUp":
            if (enemy.velocity.y === 0) {
                enemy.velocity.y -= altJump
             }
                break;
        case 'ArrowDown':
           setTimeout(() => {
             enemy.lastKey="ArrowDown"
             enemy.atack()
           }, 100);
                break;
    }
} 
})

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false
            break;
    
        case "a":
            keys.a.pressed = false
            break;
    }
    switch (event.key) {
        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break;
    
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break;
    }
})