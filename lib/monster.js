class Monster {
    constructor(x, y) {
        this.speed = 8;
        this.x = x;
        this.y = y;
        this.monsterImage = new Image();
        this.img.src = "./assets/rabbit_sprite.png";
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
    
    render(ctx) {
        // this.update(this);
        ctx.drawImage(this.heroImage, this.x, this.y, 40, 40);
    }
}

module.exports = Monster;