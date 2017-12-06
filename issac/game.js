const Util = require("./util");


class Game {
    constructor() {
        this.hero = {};
        this.monsters = {};
        this.lasers = [];
        this.coins = [];
        this.keysDown = {};
    }
}

Game.DIM_X = 660;
Game.DIM_Y = 500;
Game.FPS = 32;

module.exports = Game;