import Hero from "./hero";
import Coin from "./coin";
// import Monster from "./monster";
// import Laser from "./laser";

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.background = new Image();
        this.background.src = "./assets/canvas_background.png";

        // document.addEventListener("keydown", e => this.move(e), true);      
        
        this.hero = new Hero(100, 100);
        this.coins = [];
        // this.monsters = [];
        // this.lasers = [];
        
        // this.score = 0;
        // this.gameOver = false;
        this.paused = false;
        
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            console.log('key press');
            if (e.keyCode === 80) {
                this.togglePause();
            } else {
                if (this.paused) {
                    return;
                } else {
                    this.hero.move(e);
                    this.keysDown[e.keyCode] = true;
                }
            }
        }, false);

        document.addEventListener("keyup", e => {
            console.log('key release');
            if (this.paused) {
                return;
            } else {
                delete this.keysDown[e.keyCode];
            }
        }, false);
    }

    // bindKeyHandlers() {
    //     const hero = this.hero;
    //     Object.keys(Game.MOVES).forEach(k => {
    //         key(k, (e) => {
    //             e.preventDefault();
    //             hero.move(Game.MOVES[k]);
    //         });
    //     });
    // }

    checkCoinCollisions() {
        this.coins.forEach()
    }

    checkMonsterCollisions() {

    }

    checkCollisions() {
        this.checkCoinCollisions();
        // this.checkMonsterCollisions();
    }

    // checkCollisions() {
    //     const allObjects = this.allObjects();
    //     for (let i = 0; i < allObjects.length; i++) {
    //         for (let j = 0; j < allObjects.length; j++) {
    //             const obj1 = allObjects[i];
    //             const obj2 = allObjects[j];
        
    //             if (obj1.isCollidedWith(obj2)) {
    //             const collision = obj1.collideWith(obj2);
    //             if (collision) return;
    //             }
    //         }
    //     }
    // }

    randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
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
        console.log(this.allObjects());
        this.allObjects().forEach((obj) => obj.render(this.ctx));
    }

    animate() {
        requestAnimationFrame(animate);
    }

    render() {
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
        // this.bindKeyHandlers();
        this.render();
    }

    togglePause() {
        // if (e.keyCode === 80) {
            console.log("attempting pause toggle");
            if (this.paused === false) {
                this.paused = true;
            } else {
                this.paused = false;
            }
        // }
    }
}

// var keysDown = {};
// addEventListener("keydown", function (e) {
// 	keysDown[e.keyCode] = true;
// }, false);
// addEventListener("keyup", function (e) {
// 	delete keysDown[e.keyCode];
// }, false);

// Game.FPS = 32;
Game.WIDTH = 660;
Game.HEIGHT = 500;
Game.NUM_MONSTERS = 3;
Game.NUM_COINS = 4;

export default Game;