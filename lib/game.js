import Hero from "./hero";
import Coin from "./coin";
import Monster from "./monster";
import Laser from "./laser";

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
        this.gameOver = false;

        this.hero = new Hero(300, 200);
        this.coins = [];
        this.LMonsters = [];
        this.RMonsters = [];
        this.LLasers = [];
        this.RLasers = [];
        this.points = 0;

        document.addEventListener("keydown", e => {
            if (e.keyCode === 80) {
                this.togglePause();
            } else if (e.keyCode === 32 && 
                    this.LLasers.length + this.RLasers.length <= Game.NUM_LASERS &&
                    !this.paused &&
                    !this.gameOver) {
                if (this.playSound) {
                    let laserSound = new Audio("./assets/laser.wav");
                    laserSound.volume = 0.07;
                    laserSound.play();
                }
                if (this.hero.flipped) {
                    const l = new Laser(
                        this.hero.x - 15,
                        this.hero.y + 30,
                        true
                    );
                    this.LLasers.push(l);
                } else {
                    const l = new Laser(
                        this.hero.x + 55,
                        this.hero.y + 30,
                        false
                    );
                    this.RLasers.push(l);
                }
            }
        });

        var element = document.getElementById("musicBtn");
        element.addEventListener("click", e => {
            e.preventDefault();
            this.toggleSound();
            let val = window.getComputedStyle(element.firstElementChild).getPropertyValue('display');
            if (val === "block") {
                element.firstElementChild.style.display = "none";
                element.lastElementChild.style.display = "block";
            } else {
                element.firstElementChild.style.display = "block";
                element.lastElementChild.style.display = "none";
            }
        }, false);
        
        document.getElementById("game-over").addEventListener("click", e => {
            e.preventDefault();
            this.reset();
        }, false);
    }

    // collision(obj1, obj2) {
    //     if (Math.sqrt(Math.pow((obj1.x - obj2.x), 2) + Math.pow((obj1.y - obj2.y), 2)) <= obj1.width) return true;
    //     return false;
    // }

    collision(object1, object2) {
        if (object1.x < object2.x + object2.width / 2 && 
            object1.x + object1.width / 2 > object2.x &&
            object1.y < object2.y + object2.height / 2 && 
            object1.y + object1.height > object2.y) {
            return true;
        }
        return false;
    }

    coinCollisions() {
        this.coins.forEach(coin => {
            if (this.collision(coin, this.hero)) {
                this.points += 2;
                this.coins.splice(this.coins.indexOf(coin), 1);
                if (this.playSound) {
                    let coinSound = new Audio("./assets/coin.wav");
                    coinSound.volume = 1;
                    coinSound.play();
                }
            }
        });
    }

    laserCollisions() {
        let monsterSound = new Audio("./assets/monster_death.wav");
        monsterSound.volume = .1;

        this.LMonsters.forEach(monster => {
            this.LLasers.forEach(laser => {
                if (this.collision(monster, laser)) {
                    this.points += 1;
                    this.LMonsters.splice(this.LMonsters.indexOf(monster), 1);
                    this.LLasers.splice(this.LLasers.indexOf(laser), 1);
                    if (this.playSound) monsterSound.play();
                }
            });
        });
        this.RMonsters.forEach(monster => {
            this.RLasers.forEach(laser => {
                if (this.collision(monster, laser)) {
                    this.points += 1;
                    this.RMonsters.splice(this.RMonsters.indexOf(monster), 1);
                    this.RLasers.splice(this.RLasers.indexOf(laser), 1);
                    if (this.playSound) monsterSound.play();
                }
            });
        });
    }

    monsterCollisions() {
        let dinoSound = new Audio("./assets/roar.mp3");
        dinoSound.volume = .3;

        this.LMonsters.forEach(monster => {
            if (this.collision(monster, this.hero)) {
                if (this.playSound) dinoSound.play();
                this.gameOver = true;
            }
        });
        this.RMonsters.forEach(monster => {
            if (this.collision(monster, this.hero)) {
                if (this.playSound) dinoSound.play();
                this.gameOver = true;
            }
        });
    }

    checkCollisions() {
        this.coinCollisions();
        this.laserCollisions();
        this.monsterCollisions();
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
        if (this.LMonsters.length + this.RMonsters.length < Game.NUM_MONSTERS) {
            let r = Math.floor(Math.random() * 2);
            if (r === 0) {
                const m = new Monster(
                    -100,
                    this.randomInt(0, Game.HEIGHT - 110),
                    true
                );
                this.LMonsters.push(m);
            } else {
                const m = new Monster(
                    Game.WIDTH,
                    this.randomInt(0, Game.HEIGHT - 110),
                    false
                );
                this.RMonsters.push(m);
            }
        }
    }

    moveMonsters(modifier) {
        for (let i = 0; i < this.LMonsters.length; i++) {
            if (this.LMonsters[i].x < 660) {
                this.LMonsters[i].move(modifier);
            } else {
                this.LMonsters.splice(i, 1);
            }
        }
        for (let i = 0; i < this.RMonsters.length; i++) {
            if (this.RMonsters[i].x > -100) {
                this.RMonsters[i].move(modifier);
            } else {
                this.RMonsters.splice(i, 1);
            }
        }
    }

    // left monsters spawn from the left, left lasers shoot to the left

    moveLasers(modifier) {
        for (let i = 0; i < this.LLasers.length; i++) {
            if (this.LLasers[i].x > 0) {
                this.LLasers[i].move(modifier);
            } else {
                this.LLasers.splice(i, 1); // out of bounds, remove laser from array
            }
        }
        for (let i = 0; i < this.RLasers.length; i++) {
            if (this.RLasers[i].x < 660) {
                this.RLasers[i].move(modifier);
            } else {
                this.RLasers.splice(i, 1);
            }
        }

    }

    updatePoints() {
        const display = document.getElementById("points-display");
        display.innerHTML = this.points;
    }

    toggleSound() {
        if (!this.gameOver) {
            this.playSound = !this.playSound;
            if (this.playSound) {
                this.backgroundSound.play();
            } else {
                this.backgroundSound.pause();
            }
        }
    }
    
    togglePause() {
        this.paused = !this.paused;
        if (this.paused) {
            if (this.playSound) this.backgroundSound.pause();
        } else { // toggle music with pause without changing this.playSound
            if (this.playSound) this.backgroundSound.play();
        }
    }

    allObjects() {
        return [].concat(
            this.hero,
            this.coins,
            this.LMonsters,
            this.RMonsters,
            this.LLasers,
            this.RLasers
        );
    }

    renderAllObjects() {
        this.checkCollisions();
        this.updatePoints();
        this.allObjects().forEach((obj) => obj.render(this.ctx));
    }

    render() {
        if (this.paused) {
            requestAnimationFrame(this.render.bind(this));
        } else if (this.gameOver) {
            this.backgroundSound.pause();
            cancelAnimationFrame(requestID);
            document.getElementById('game-over').style.display = "inherit";
        } else {
            const now = Date.now();
            const delta = Math.min(.1, (now - then) / 1000); // limits animation loop while paused or blurred

            this.coins.forEach(coin => coin.update(coin));
            this.hero.move(delta);
            this.moveMonsters(delta);
            this.moveLasers(delta);

            this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
            this.ctx.drawImage(this.background, 0, 0);

            this.generateCoins();
            this.generateMonsters();
            this.renderAllObjects();

            then = now;
            requestAnimationFrame(this.render.bind(this));
        }
    }

    start() {
        this.render();
        document.getElementById('game-over').style.display = "none";
    }

    reset() {
		document.getElementById('game-over').style.display = "none";
        this.background = new Image();
        this.background.src = "./assets/canvas_background.png";
        this.backgroundSound = new Audio("./assets/tekno.wav");
        this.backgroundSound.volume = 0.25;
        this.backgroundSound.loop = true;
        this.backgroundSound.play();
        this.playSound = true;
        this.paused = false;
        this.gameOver = false;

        this.hero = new Hero(300, 200);
        this.coins = [];
        this.LMonsters = [];
        this.RMonsters = [];
        this.LLasers = [];
        this.RLasers = [];
        this.points = 0;

        this.start();
    }
}

var then = Date.now();
var requestID;

Game.WIDTH = 660;
Game.HEIGHT = 500;
Game.NUM_LASERS = 2;
Game.NUM_MONSTERS = 3;
Game.NUM_COINS = 3;

export default Game;