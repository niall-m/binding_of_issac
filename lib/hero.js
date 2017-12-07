class Hero {
    constructor(x, y) {
        this.speed = 10;
        this.x = x;
        this.y = y;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";
    }

    move(event) {
        console.log(this, event);
        switch (event.which) {
            case 65: // "A" move left
                this.x -= this.speed;
                break;
            case 68: // "D" move right
                this.x += this.speed;
                break;
            case 87: // "W" move up
                this.y -= this.speed;
                break;
            case 83: // "S" move down
                this.y += this.speed;
                break;
        }
    }
    
    render(ctx) {
        ctx.drawImage(this.heroImage, this.x, this.y);
    }
}

module.exports = Hero;