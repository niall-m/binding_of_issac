const Hero = require("./hero");
const Monster = require("./monster");
const Coin = require("./coin");
const Laser = require("./laser");

const Util = require("./util");

class Game {
    constructor() {
        this.hero = {};
        this.monsters = {};
        this.lasers = [];
        this.coins = [];

        this.addMonsters();
        this.addCoins();
    }

    add(obj) {
        if (obj instanceof Monster) {
            this.monsters.push(obj);
        } else if (obj instanceof Laser) {
            this.lasers.push(obj);
        } else if (obj instanceof Coin) {
            this.coins.push(obj);
        } else if (obj instanceof Hero) {
            this.hero.push(obj);
        } else {
            throw "WTF m8?";
        }
    }

    addMonsters() {
        for (let i = 0; i < Game.NUM_MONSTERS; i++) {
            this.add(new Monster({ game: this }));
        }
    }

    addCoins() {
        for (let i = 0; i < Game.NUM_COINS; i++) {
            this.add(new Coin({ game: this }));
        }
    }

    addHero() {
        const hero = new Hero({
            pos: this.randomPosition(),
            game: this
        });
        this.add(hero);
        return hero;
    }

    allObjects() {
        return [].concat(this.hero, this.monsters, this.lasers, this.coins);
    }

    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];

                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if (collision) return;
                }
            }
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
        this.allObjects().forEach((object) => {
            object.draw(ctx);
        });
    }

    isOutOfBounds(pos) {
        return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
    }

    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            object.move(delta);
        });
    }

    randomPosition() {
        return [
            Game.DIM_X * Math.random(),
            Game.DIM_Y * Math.random()
        ];
    }

    remove(object) {
        if (object instanceof Laser) {
            this.lasers.splice(this.lasers.indexOf(object), 1);
        } else if (object instanceof Monster) {
            this.monsters.splice(this.monsters.indexOf(object), 1);
        } else if (object instanceof Coin) {
            this.coins.splice(this.coins.indexOf(object), 1);
        } else {
            throw "wtf?";
        }
    }

    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
    }
}

const keyDown = {};

addEventListener("keydown", function (e) {
    keyDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keyDown[e.keyCode];
}, false);

Game.DIM_X = 660;
Game.DIM_Y = 500;
Game.FPS = 32;
Game.NUM_MONSTERS = 3;
Game.NUM_COINS = 4;

module.exports = Game;