import Hero from "./hero";
import Coin from "./coin";
import Monster from "./monster";

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.background = new Image();
        this.background.src = "./assets/canvas_background.png";
        this.backgroundSound = new Audio("./assets/tekno.wav");
        this.backgroundSound.volume = 0.25;
        this.backgroundSound.loop = true;
        this.backgroundSound.play();
        this.playSound = true;
        this.paused = false;
        // this.gameOver = false;

        this.hero = new Hero(300, 200);
        this.coins = [];
        this.leftMonsters = [];
        this.rightMonsters = [];
        this.points = 0;

        document.addEventListener("keydown", e => {
            if (e.keyCode === 80) {
                this.togglePause();
            }
        });

        document.getElementById("musicBtn").addEventListener("click", e => {
            this.toggleSound();
        }, false);
    }

    checkCollisions() {
        this.coinCollisions();
        this.laserCollisions();
        this.monsterCollisions();
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

    laserCollisions() {
        this.leftMonsters.forEach(monster => {
            this.hero.leftLasers.forEach(laser => {
                if (monster.collideWith(laser)) {
                    this.points += 1;
                    this.leftMonsters.splice(this.leftMonsters.indexOf(monster), 1);
                }
            });
        });
    }

    monsterCollisions() {

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
    
    generateMonsters() {
        if (this.leftMonsters.length + this.rightMonsters.length < Game.NUM_MONSTERS) {
            let r = Math.floor(Math.random() * 2);
            if (r === 0) {
                const m = new Monster(
                    0,
                    this.randomInt(0, Game.HEIGHT - 110),
                    true
                );
                this.leftMonsters.push(m);
            } else {
                const m = new Monster(
                    Game.WIDTH - 100,
                    this.randomInt(0, Game.HEIGHT - 110),
                    false
                );
                this.rightMonsters.push(m);
            }
        }
    }

    moveMonsters(modifier) {
        if (!this.paused) {
            for (let i = 0; i < this.leftMonsters.length; i++) {
                if (this.leftMonsters[i].x < 660) {
                    this.leftMonsters[i].move(modifier);
                } else {
                    this.leftMonsters.splice(i, 1);
                }
            }
            for (let i = 0; i < this.rightMonsters.length; i++) {
                if (this.rightMonsters[i].x > 0) {
                    this.rightMonsters[i].move(modifier);
                } else {
                    this.rightMonsters.splice(i, 1);
                }
            }
        }
    }

    updatePoints() {
        const display = document.getElementById('points-display');
        display.innerHTML = this.points;
    }

    toggleSound() {
        this.playSound = !this.playSound;
        if (this.playSound) {
            this.backgroundSound.play();
            this.hero.sound = true;
        } else {
            this.backgroundSound.pause();
            this.hero.sound = false;
        }
    }
    
    togglePause() {
        this.paused = !this.paused;
        if (this.paused) {
            this.hero.paused = true;
            if (this.playSound) {
                this.backgroundSound.pause();
                this.hero.sound = false;
            }
        } else { // toggle music with pause without changing this.playSound
            this.hero.paused = false;
            if (this.playSound) {
                this.backgroundSound.play();
                this.hero.sound = true;
            }
        }
    }

    allObjects() {
        return [].concat(this.hero, this.coins, this.leftMonsters, this.rightMonsters);
    }

    renderAllObjects() {
        this.checkCollisions();
        this.updatePoints();
        this.allObjects().forEach((obj) => obj.render(this.ctx));
    }

    render() {
        if (this.paused) {
            requestAnimationFrame(this.render.bind(this));
        } else {
            const now = Date.now();
            const delta = Math.min(.1, (now - then) / 1000); 
            // limits animation loop while paused or blurred

            this.coins.forEach(coin => coin.update(coin));
            this.hero.moveLaser();
            this.hero.move(delta);
            this.moveMonsters(delta);

            this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
            this.ctx.drawImage(this.background, 0, 0);
            this.generateCoins();
            this.generateMonsters();
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
Game.NUM_MONSTERS = 3;
Game.NUM_COINS = 3;

export default Game;