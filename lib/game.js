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
        
        this.score = 0;
        this.paused = false;
        // this.gameOver = false;
        
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            // console.log('key press');
            if (e.keyCode === 80) {
                this.togglePause();
            } else {
                if (this.paused) {
                    return;
                } else {
                    this.keysDown[e.keyCode] = true;
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
                delete this.keysDown[e.keyCode];
                // console.log(this.keysDown);
            }
        }, false);
    }

    checkCoinCollisions() {
        this.coins.forEach(coin => {
            
        });
    }

    // checkMonsterCollisions() {

    // }

    // checkCollisions() {
    //     this.checkCoinCollisions();
    //     // this.checkMonsterCollisions();
    // }

    // generate random number in increments of 10 between range canvas(x, y)
    randomInt(min, max) {
        // const byTen = Math.floor(Math.random()*11)*10;
        // const range = Math.floor(Math.random() * (max - min)) + min;
        // return range * byTen;
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
        // if (e.keyCode === 80) {
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