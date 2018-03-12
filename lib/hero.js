class Hero {
    constructor(x, y) {
        this.speed = 300;
        this.x = x;
        this.y = y;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";
        this.flipped = false;
        this.paused = false;
        this.sound = true;
        this.totalLasers = 2;
        this.leftLasers = [];
        this.rightLasers = [];
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            if (e.keyCode === 32 && 
                this.leftLasers.length + this.rightLasers.length <= this.totalLasers &&
                !this.paused) {
                if (this.sound) {
                    let laserSound = new Audio("./assets/laser.wav");
                    laserSound.volume = 0.07;
                    laserSound.play();
                }
                if (this.flipped) {
                    this.leftLasers.push([this.x - 15, this.y + 30, 25, 5]);
                } else {
                    this.rightLasers.push([this.x + 55, this.y + 30, 25, 5]);
                }
            } else { // movement
                this.keysDown[e.keyCode] = true;
            }
        }, false);

        document.addEventListener("keyup", e => {
            if (e.keyCode === 32) {
                e.preventDefault(); // prevents spacebar toggling music
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
        for (let i = 0; i < this.leftLasers.length; i++) {
            if (this.leftLasers[i][0] > 0) {
                // move laser 10 pixels per animation tick if in bounds
                this.leftLasers[i][0] -= 10;
            } else {
                this.leftLasers.splice(i, 1);
                // remove laser from array if out of bounds of canvas
            }
        }
        for (let i = 0; i < this.rightLasers.length; i++) {
            if (this.rightLasers[i][0] < 660) {
                this.rightLasers[i][0] += 10;
            } else {
                this.rightLasers.splice(i, 1);
            }
        }
    }
      
    collideWith(obj2) {
        if (Math.sqrt( Math.pow((this.x - obj2.x), 2) + Math.pow((this.y - obj2.y), 2) ) <= 50) {
            return true;
        }
        return false;
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