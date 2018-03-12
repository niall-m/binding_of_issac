class Hero {
    constructor(x, y) {
        this.speed = 300;
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";
        this.flipped = false;
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            this.keysDown[e.keyCode] = true;
        }, false);

        document.addEventListener("keyup", e => {
            if (e.keyCode === 32) {
                e.preventDefault(); // prevents spacebar toggling music while paused
            } else {
                delete this.keysDown[e.keyCode];
            }
        }, false);
    } 

    move(modifier) { // modifier is time delta / 1000 
        // holding left, 'a' or arrow
        if (65 in this.keysDown || 37 in this.keysDown)  {
            this.flipped = true;
            if (this.x > 20) {    
                this.x -= this.speed * modifier;
            }
        }
        // holding right, 'd' or arrow
        if (68 in this.keysDown || 39 in this.keysDown) {
            this.flipped = false;
            if (this.x < 580) {
                this.x += this.speed * modifier;
            }
        }
        // holding up, 'w' or arrow
        if (87 in this.keysDown || 38 in this.keysDown) {
            if (this.y > 40) {
                this.y -= this.speed * modifier;
            }
        }
        // holding down, 's' or arrow
        if (83 in this.keysDown || 40 in this.keysDown) {
            if (this.y < 405) {    
                this.y += this.speed * modifier;
            }
        }
    }

    render(ctx) {
        if (this.flipped) {
            ctx.scale(-1,1);
            ctx.drawImage(this.heroImage, -this.x - this.width, this.y, this.width, this.height);
            ctx.scale(-1,1);
        }
        else {
            ctx.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
        }
    }
}

module.exports = Hero;