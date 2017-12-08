import Hero from "./hero";
import Coin from "./coin";
// import Monster from "./monster";
// import Laser from "./laser";

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.background = new Image();
        this.background.src = "./assets/canvas_background.png";
        
        this.hero = new Hero(100, 100);
        this.coins = [];
        // this.monsters = [];
        // this.lasers = [];
        
        this.points = 0;
        this.paused = false;
        // this.gameOver = false;
        
        this.keysDown = {};

        document.addEventListener("keypress", e => {
            // console.log('key press');
            if (e.key === "p") {
                this.togglePause();
            } else {
                if (this.paused) {
                    return;
                } else {
                    this.keysDown[e.key] = true;
                    this.hero.move(e, this.keysDown);
                }
            }
        }, false);

        document.addEventListener("keyup", e => {
            // console.log('key release');
            if (this.paused) {
                return;
            } else {
                // console.log(this.keysDown);
                delete this.keysDown[e.key];
                this.hero.move(e, this.keysDown);

                // console.log(this.keysDown);
            }
        }, false);
    }

    // collideWith(otherObject) {
    //     if (otherObject instanceof Coin) {
    //         otherObject.remove();
    //         return true;
    //     }
        // if (otherObject instanceof Monster) {
        //     this.remove();
        //     return true;
        // }
    // }

    // collideWith(obj2) {
    //     if (Math.sqrt( Math.pow((this.x - obj2.x), 2) + Math.pow((this.y - obj2.y), 2) ) <= 40) {
    //         console.log("collision");
    //         obj2.remove();
    //         return true;
    //     } 
    //     // else if (obj1.y <= obj2.y) {
    //     //     return true;
    //     // } 
    //     else {
    //         return false;
    //     }
    // }

    remove(object) {
        if (object instanceof Coin) {
            this.coins.splice(this.coins.indexOf(object), 1);
        } else if (object instanceof Hero) {
            this.hero = {};
        } else {
            throw "wtf?";
        }
    }

    coinCollisions() {
        this.coins.forEach(coin => {
            if (coin.collideWith(this.hero)) {
                this.points += 1;
                // console.log(this.points);
                this.remove(coin);
                return true;
            }
        });
    }

    updatePoints() {
        const display = document.getElementById('points-display');
        display.innerHTML = this.points;
    }
    
    checkCollisions() {
        this.coinCollisions();
        
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    generateCoins() {
        if (this.coins.length < Game.NUM_COINS) {
            const c = new Coin(
                this.randomInt(100, Game.WIDTH - 100), 
                this.randomInt(100, Game.HEIGHT - 100)
            );
            this.coins.push(c);
        }
    }

    allObjects() {
        return [].concat(this.hero, this.coins);
    }

    renderAllObjects() {
        // console.log(this.allObjects());
        this.checkCollisions();
        this.updatePoints();
        this.allObjects().forEach((obj) => obj.render(this.ctx));
    }

    // update(this.keysDown)

    render() {
        const now = Date.now();
        // const delta = now - then;
        if (this.paused) {
            requestAnimationFrame(this.render.bind(this));
        } else {
            this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
            this.ctx.drawImage(this.background, 0, 0);
            this.generateCoins();
            this.renderAllObjects();
            requestAnimationFrame(this.render.bind(this));
        }
    }

    start() {
        this.render();
    }

    togglePause() {
        // if (e.key === 80) {
            if (this.paused === false) {
                this.paused = true;
            } else {
                this.paused = false;
            }
        // }
    }
}

Game.WIDTH = 660;
Game.HEIGHT = 500;
Game.NUM_MONSTERS = 3;
Game.NUM_COINS = 4;

export default Game;