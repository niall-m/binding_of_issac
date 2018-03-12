class Laser {
    constructor(x, y, boolean) {
        this.speed = 400;
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 5;
        this.flipped = boolean;
    }

    move(modifier) {
        if (this.flipped) {
            this.x -= this.speed * modifier;
        } else {
            this.x += this.speed * modifier;
        }
    }

    render(ctx) {
        ctx.fillStyle = '#989898';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

module.exports = Laser;