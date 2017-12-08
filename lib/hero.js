class Hero {
    constructor(x, y) {
        this.speed = 10;
        this.x = x;
        this.y = y;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";
    } 

    // update() {        
    //     this.tickCount += 1;
    //     if (this.tickCount > this.ticksPerFrame) {
    //         this.tickCount = 0;
    //         if (this.frameIndex < this.numberOfFrames - 1) {
    //             this.frameIndex += 1;
    //         } else {
    //             this.frameIndex = 0;
    //         }
    //         this.frameIndex += 1;
    //       }
    // }

    move(event, keysDown) {
        // console.log(keysDown);
        if (65 in keysDown) {
            if (this.x > 30) {    
                this.x -= this.speed;
            }
        }
        if (68 in keysDown) {
            if (this.x < 600) {    
                this.x += this.speed;
            }
        }
        if (87 in keysDown) {
            if (this.y > 40) {    
                this.y -= this.speed;
            }
        }
        if (83 in keysDown) {
            if (this.y < 420) {    
                this.y += this.speed;
            }
        }
    }

    render(ctx) {
        // this.update(this);
        ctx.drawImage(this.heroImage, this.x, this.y, 40, 40);
    }
}

module.exports = Hero;