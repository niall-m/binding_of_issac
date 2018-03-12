class Monster {
    constructor(x, y, boolean) {
        this.speed = 200;
        this.x = x;
        this.y = y;
        this.monsterImage = new Image();
        this.monsterImage.src = "./assets/dragon.png";
        this.flipped = boolean;
    }

    move(modifier) {
        if (this.flipped) {
            this.x += this.speed * modifier;
        } else {
            this.x -= this.speed * modifier;
        }
    }
    
    render(ctx) {
        if (this.flipped) {
            ctx.scale(-1,1);
            ctx.drawImage(this.monsterImage, -this.x - 100, this.y, 100, 100);
            ctx.scale(-1,1);
        } else {
            ctx.drawImage(this.monsterImage, this.x, this.y, 100, 100);
        }
    }
}

module.exports = Monster;