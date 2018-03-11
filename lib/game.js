import Hero from "./hero";
import Coin from "./coin";
// import Monster from "./monster";
// import Laser from "./laser";

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.background = new Image();
        this.background.src = "./assets/canvas_background.png";
        
        this.backgroundSound = new Audio("./assets/tekno.wav");
        this.backgroundSound.volume = 0.25;
        this.backgroundSound.play();
        this.backgroundSound.loop = true;
        this.playSound = true;

        this.hero = new Hero(100, 100);
        this.coins = [];
        // this.monsters = [];
        // this.lasers = [];
        
        this.points = 0;
        this.paused = false;
        // this.gameOver = false;

        document.addEventListener("keydown", e => {
            if (e.keyCode === 80) {
                this.togglePause();
            }
        });

        document.getElementById("musicBtn").addEventListener("click", e => {
            this.toggleSound();
        }, false);
        
    }

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
                this.remove(coin);
                if (this.playSound) {
                    let coinSound = new Audio("./assets/smw_coin.wav");
                    coinSound.volume = 1;
                    coinSound.play();
                }
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
                this.randomInt(50, Game.WIDTH - 100), 
                this.randomInt(50, Game.HEIGHT - 100)
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

    toggleSound() {
        if (this.playSound) {
            this.playSound = false;
            this.backgroundSound.pause();
            this.hero.sound = false;
        } else {
            this.playSound = true;
            this.backgroundSound.play();
            this.hero.sound = true;
        }
    }
    
    togglePause() {
        if (this.paused) {
            this.paused = false;
            this.hero.paused = false;
            if (this.playSound) {
                this.backgroundSound.play();
            }
        } else {
            this.paused = true;
            this.hero.paused = true;
            // toggle music with pause does not change boolean value
            if (this.playSound) {
                this.backgroundSound.pause();
            }
        }
    }

    render() {
        if (this.paused) {
            requestAnimationFrame(this.render.bind(this));
        } else {
            const now = Date.now();
            var delta = now - then;

            this.hero.moveLaser();
            this.hero.move(delta / 1000);

            this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
            this.ctx.drawImage(this.background, 0, 0);
            this.generateCoins();
            this.renderAllObjects();
            this.hero.drawLaser(this.ctx);

            then = now;
            requestAnimationFrame(this.render.bind(this));
        }
    }

    start() {
        this.render();
    }
}

var then = Date.now();

Game.WIDTH = 660;
Game.HEIGHT = 500;
Game.NUM_MONSTERS = 4;
Game.NUM_COINS = 3;

export default Game;