class Sprite {
    constructor({ position, imageSrc, scale, framesHold, frameMax=1, fit ={x:0, y:0,},}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc
        this.scale=scale
        this.frameMax=frameMax
        this.frameCurrent= 0
        this.framesElapse = 0
        this.framesHold = framesHold
        this.fit=fit

    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frameCurrent*(this.image.width/this.frameMax),
            0,
            this.image.width/this.frameMax,
            this.image.height + this.fit.y,
            this.position.x - this.fit.x,
            this.position.y - this.fit.y,
            (this.image.width/this.frameMax)*this.scale,
            this.image.height*this.scale,
        );
/**        // real dimeção da imagem
        ctx.fillStyle="rgba(0,255,0,0.5)"
        ctx.fillRect(
            this.position.x - this.fit.x,
            this.position.y - this.fit.y,
            (this.image.width/this.frameMax)*this.scale,
            this.image.height*this.scale,
        )
/**      // dimeção do fit
        ctx.fillStyle="rgba(255,0,0,0.5)"
        ctx.fillRect(this.position.x-this.fit.x,this.position.y-this.fit.y,this.fit.x,100)
/**/
    }
    animateFrames() {
        this.framesElapse ++
        if (this.framesElapse % this.framesHold === 0) {
        if (this.frameCurrent < this.frameMax - 1){
            this.frameCurrent ++           
        }else{
            this.frameCurrent = 0
        }
      }
    }
    update() {
        this.draw();
        this.animateFrames();   
    }
}

class fighter extends Sprite{
    constructor({ 
        position,
        velocity, 
        damage, 
        offset,
        imageSrc,
        scale,
        framesHold,
        frameMax,
        fit={x:0,y:0},
        sprites,
        attackBox={offset:{x:0, y:0,}, width:undefined, height:undefined,},
    }) {
        super({
            imageSrc,
            scale,
            frameMax,
            fit,
        })
        this.position=position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset:attackBox.offset,
            width:attackBox.width,
            height:attackBox.height,
        };
        this.isAttacking;
        this.caunt=1
        this.Health = 100;
        this.death = false;
        this.damage = damage,
        this.frameCurrent= 0
        this.framesElapse = 0
        this.framesHold = framesHold
        this.sprites=sprites
        this.offset = offset

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        } 
    }
    update() {
        this.draw();
       if (!this.death) {
         this.animateFrames()
       }
        // attackBox 
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

 /*
ctx.fillStyle="rgba(0,0,0,0.3)"
ctx.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
*/
/*
ctx.fillStyle="rgba(255,255,0,0.5)"
ctx.fillRect(this.position.x,this.position.y,this.offset.x,this.offset.y)
*/

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 40) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }

    atack() {
        this.switchSprites("atack")
        this.isAttacking = true;
        this.caunt++
        setTimeout(() => {
            this.isAttacking = false;
            this.caunt=0;
        }, this.caunt);
        
    }

    takehit(){ 
        this.Health -= this.damage 
        this.isAttacking = false
        if (this.Health <= 1) {
        this.switchSprites("death")
        }else{
        this.switchSprites("takehit")
        }
    }

    switchSprites(sprite) {
        if (this.image === this.sprites.death.image){
        if (this.image === this.sprites.death.image && this.frameCurrent === this.sprites.death.frameMax -1){this.death = true}   
          return
        };

        if (this.image === this.sprites.atack.image && this.frameCurrent < this.sprites.atack.frameMax -1) return
        if (this.image === this.sprites.takehit.image && this.frameCurrent < this.sprites.takehit.frameMax -1) return
     
       switch (sprite) {
        case "idle":
        if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image
            this.frameMax = this.sprites.idle.frameMax
            this.frameCurrent=0
        }
        break;
        case "run":
            if (this.image !== this.sprites.run.image){
            this.image = this.sprites.run.image
            this.frameMax = this.sprites.run.frameMax
            this.frameCurrent=0
        }
            break;
       case "jump":
        if (this.image !== this.sprites.jump.image){
            this.image = this.sprites.jump.image
            this.frameMax = this.sprites.jump.frameMax
            this.frameCurrent=0
        }
        break;
        case "fall":
            if (this.image !== this.sprites.fall.image){
                this.image = this.sprites.fall.image
            this.frameMax = this.sprites.fall.frameMax
            this.frameCurrent=0
            }
        break;
        case "atack":
            if (this.image !== this.sprites.atack.image){
                this.image = this.sprites.atack.image
            this.frameMax = this.sprites.atack.frameMax
            this.frameCurrent=0
            }
        break;
        case "takehit":
            if (this.image !== this.sprites.takehit.image){
                this.image = this.sprites.takehit.image
            this.frameMax = this.sprites.takehit.frameMax
            this.frameCurrent=0
            }
        break;
        case "death":
            if (this.image !== this.sprites.death.image){
                this.image = this.sprites.death.image
            this.frameMax = this.sprites.death.frameMax
            this.frameCurrent=0
            }
        break;
        default:
            this.imageSrc="img/ind/Vibe.png"
            break;
       }
    }
}
