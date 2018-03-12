class Monster {
    constructor(x, y, boolean) {
        this.speed = 200;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
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
            ctx.drawImage(this.monsterImage, -this.x - this.width, this.y, this.width, this.height);
            ctx.scale(-1,1);
        } else {
            ctx.drawImage(this.monsterImage, this.x, this.y, this.width, this.height);
        }
    }
}

module.exports = Monster;