class Hero {
    constructor(x, y) {
        this.speed = 10;
        this.x = x;
        this.y = y;
        this.heroImage = new Image();
        this.heroImage.src = "https://i.imgur.com/hRkeDSi.png";
        // this.heroImage.src = "./assets/knight.png";
    } 

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

    // if x1 - x2 squared + y1 - y2 squared <= 40, then they're colliding
    
    render(ctx) {
        ctx.drawImage(this.heroImage, this.x, this.y, 40, 40);
    }
}

module.exports = Hero;