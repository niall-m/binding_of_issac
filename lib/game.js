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
        
        this.keysDown = {};
        document.addEventListener("keydown", e => {
            console.log('key press');
            this.hero.move(e);
            this.keysDown[e.keyCode] = true;
        }, false);
        document.addEventListener("keyup", e => {
            console.log('key release');
            delete this.keysDown[e.keyCode];
        }, false);

        // this.score = 0;
        // this.gameOver = false;
        // this.paused = false;
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

    allObjects() {
        return [].concat(this.hero, this.coins);
    }

    renderAllObjects() {
        console.log(this.allObjects());
        this.allObjects().forEach((obj) => obj.render(this.ctx));
    }

    render() {
        this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        this.ctx.drawImage(this.background, 0, 0);
        this.generateCoins();
        this.renderAllObjects();
        requestAnimationFrame(this.render.bind(this));
    }

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

    togglePause(e) {
        if (e.keyCode === 80) {
            if (this.paused === false) {
                this.paused = true;
            } else {
                this.paused = false;
            }
        }
    }

    start() {
        // this.bindKeyHandlers();
        this.render();
    }
}

// var keysDown = {};
// addEventListener("keydown", function (e) {
// 	keysDown[e.keyCode] = true;
// }, false);
// addEventListener("keyup", function (e) {
// 	delete keysDown[e.keyCode];
// }, false);

Game.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
};

Game.FPS = 32;
Game.WIDTH = 660;
Game.HEIGHT = 500;
Game.NUM_MONSTERS = 3;
Game.NUM_COINS = 4;

export default Game;