class Hero {
    constructor(x, y) {
        this.speed = 300;
        this.x = x;
        this.y = y;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";

        this.paused = false;
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            // console.log('key down');
            if (this.paused) {
                this.keysDown = {};
            } else {
                this.keysDown[e.keyCode] = true;
                // console.log(this.keysDown);
            }
        }, false);

        document.addEventListener("keyup", e => {
            // console.log('key up');
            if (this.paused) {
                this.keysDown = {};
            } else {
                // console.log(this.keysDown);
                delete this.keysDown[e.keyCode];
                // console.log(this.keysDown);
            }
        }, false);
    } 

    move(modifier) {
        // holding left, 'a' or arrow
        if (65 in this.keysDown || 37 in this.keysDown)  {
            if (this.x > 30) {    
                this.x -= this.speed * modifier;
            }
        }
        // holding right, 'd' or arrow
        if (68 in this.keysDown || 39 in this.keysDown) {
            if (this.x < 600) {    
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
            if (this.y < 420) {    
                this.y += this.speed * modifier;
            }
        }
    }

    render(ctx) {
        ctx.drawImage(this.heroImage, this.x, this.y, 60, 60);
    }
}

module.exports = Hero;