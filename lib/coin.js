class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.coinImage = new Image();
        // this.coinImage.src = "https://i.imgur.com/SJtG1rE.png";
        this.coinImage.src = "./assets/coin-sprite.png";
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = this.ticksPerFrame || 4;
        this.numberOfFrames = this.numberOfFrames || 10;
    }

    update() {        
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
            // this.frameIndex += 1;
          }
    }

    render(ctx) {
        ctx.drawImage(
            this.coinImage,
            this.frameIndex * 1000 / this.numberOfFrames,
            0,
            1000 / this.numberOfFrames,
            100,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

module.exports = Coin;