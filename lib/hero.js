class Hero {
    constructor(x, y) {
        this.speed = 300;
        this.x = x;
        this.y = y;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";
        this.flipped = false;
        this.paused = false;
        this.leftLasers = [];
        this.rightLasers = [];
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
                this.flipped = true;
            }
        }
        // holding right, 'd' or arrow
        if (68 in this.keysDown || 39 in this.keysDown) {
            if (this.x < 600) {
                this.x += this.speed * modifier;
                this.flipped = false;
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
        // shoot a laser
        if (32 in this.keysDown) {
            if (this.flipped) {
                this.leftLasers.push([this.x - 15, this.y + 30, 20, 5]);
            }
            else {
                this.rightLasers.push([this.x + 55, this.y + 30, 20, 5]);
            }
        }
    }

    drawLaser(ctx) {
        ctx.fillStyle = '#989898';
        if (this.leftLasers.length) {
            for (let i = 0; i < this.leftLasers.length; i++) {
                ctx.fillRect(this.leftLasers[i][0],this.leftLasers[i][1],this.leftLasers[i][2],this.leftLasers[i][3]);
            }
        }
        if (this.rightLasers.length) {
            for (let i = 0; i < this.rightLasers.length; i++) {
                ctx.fillRect(this.rightLasers[i][0],this.rightLasers[i][1],this.rightLasers[i][2],this.rightLasers[i][3]);
            }
        }
    }

    moveLaser() {
        // console.log("moving");
        for (let i = 0; i < this.leftLasers.length; i++) {
            if (this.leftLasers[i][0] > 0) {
                this.leftLasers[i][0] -= 10;
            } else if (this.leftLasers[i][0] < 0) {
                this.leftLasers.splice(i, 1);
            }
        }
        for (let i = 0; i < this.rightLasers.length; i++) {
            if (this.rightLasers[i][0] < 660) {
                this.rightLasers[i][0] += 10;
            } else if (this.rightLasers[i][0] > 660) {
                this.rightLasers.splice(i, 1);
            }
        }
    }
      

    render(ctx) {
        if (this.flipped) {
            ctx.scale(-1,1);
            ctx.drawImage(this.heroImage, -this.x - 60, this.y, 60, 60);
            ctx.scale(-1,1);
        }
        else {
            ctx.drawImage(this.heroImage, this.x, this.y, 60, 60);
        }
    }
}

module.exports = Hero;