/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx);
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hero__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hero___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__hero__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coin__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__coin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monster__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__monster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__laser__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__laser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__laser__);





class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.background = new Image();
        this.background.src = "./assets/canvas_background.png";
        this.backgroundSound = new Audio("./assets/tekno.wav");
        this.backgroundSound.volume = 0.25;
        this.backgroundSound.loop = true;
        this.playSound = false;
        this.paused = false;
        this.gameOver = false;

        this.hero = new __WEBPACK_IMPORTED_MODULE_0__hero___default.a(300, 200);
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
                    laserSound.volume = 0.1;
                    laserSound.play();
                }
                if (this.hero.flipped) {
                    const l = new __WEBPACK_IMPORTED_MODULE_3__laser___default.a(
                        this.hero.x - 15,
                        this.hero.y + 30,
                        true
                    );
                    this.LLasers.push(l);
                } else {
                    const l = new __WEBPACK_IMPORTED_MODULE_3__laser___default.a(
                        this.hero.x + 55,
                        this.hero.y + 30,
                        false
                    );
                    this.RLasers.push(l);
                }
            }
        });

        var musicBtn = document.getElementById("musicBtn");
        musicBtn.addEventListener("click", e => {
            e.preventDefault();
            this.toggleSound();
            let val = window.getComputedStyle(musicBtn.firstElementChild).getPropertyValue('display');
            if (val === "block") {
                musicBtn.firstElementChild.style.display = "none";
                musicBtn.lastElementChild.style.display = "block";
            } else {
                musicBtn.firstElementChild.style.display = "block";
                musicBtn.lastElementChild.style.display = "none";
            }
        }, false);
        
        var begin = document.getElementById("start-game");
        begin.addEventListener("click", e => {
            e.preventDefault();
            begin.style.display = "none";
            this.start();
        });

        document.getElementById("game-over").addEventListener("click", e => {
            e.preventDefault();
            let val = window.getComputedStyle(musicBtn.firstElementChild).getPropertyValue('display');
            if (this.gameOver && val === "none") {
                musicBtn.firstElementChild.style.display = "block";
                musicBtn.lastElementChild.style.display = "none";
            } 
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
        monsterSound.volume = .3;

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
            const c = new __WEBPACK_IMPORTED_MODULE_1__coin___default.a(
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
                const m = new __WEBPACK_IMPORTED_MODULE_2__monster___default.a(
                    -100,
                    this.randomInt(0, Game.HEIGHT - 110),
                    true
                );
                this.LMonsters.push(m);
            } else {
                const m = new __WEBPACK_IMPORTED_MODULE_2__monster___default.a(
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
            if (this.playSound) this.backgroundSound.pause();
            cancelAnimationFrame(requestID);
            document.getElementById('game-over').style.display = "flex";
        } else {
            const now = Date.now();
            const delta = Math.min(.1, (now - then) / 1000); // limits animation loop while paused or blurred

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
        this.playSound = true;
        this.backgroundSound.play();
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

        this.hero = new __WEBPACK_IMPORTED_MODULE_0__hero___default.a(300, 200);
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

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Hero {
    constructor(x, y) {
        this.speed = 300;
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";
        this.flipped = false;
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            this.keysDown[e.keyCode] = true;
        }, false);

        document.addEventListener("keyup", e => {
            if (e.keyCode === 32) {
                e.preventDefault(); // prevents spacebar toggling music while paused
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

    render(ctx) {
        if (this.flipped) {
            ctx.scale(-1,1);
            ctx.drawImage(this.heroImage, -this.x - this.width, this.y, this.width, this.height);
            ctx.scale(-1,1);
        }
        else {
            ctx.drawImage(this.heroImage, this.x, this.y, this.width, this.height);
        }
    }
}

module.exports = Hero;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.coinImage = new Image();
        // this.coinImage.src = "https://i.imgur.com/SJtG1rE.png";
        this.coinImage.src = "./assets/coin-sprite.png";
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 4;
        this.numberOfFrames = 10;
    }

    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    // 1000 = total px width of src img
    // first 4 source, last 4 destination
    render(ctx) {
        this.update(this);
        ctx.drawImage(
            this.coinImage,
            this.frameIndex * 1000 / this.numberOfFrames,
            0,
            100,
            100,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

module.exports = Coin;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Monster {
    constructor(x, y, boolean) {
        this.speed = 200;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.monsterImage = new Image();
        this.monsterImage.src = "./assets/dragon.png";
        this.flipped = boolean;
    }

    move(modifier) {
        if (this.flipped) {
            this.x += this.speed * modifier;
        } else {
            this.x -= this.speed * modifier;
        }
    }

    render(ctx) {
        if (this.flipped) {
            ctx.scale(-1,1);
            ctx.drawImage(this.monsterImage, -this.x - this.width, this.y, this.width, this.height);
            ctx.scale(-1,1);
        } else {
            ctx.drawImage(this.monsterImage, this.x, this.y, this.width, this.height);
        }
    }
}

module.exports = Monster;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Laser {
    constructor(x, y, boolean) {
        this.speed = 400;
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 5;
        this.flipped = boolean;
    }

    move(modifier) {
        if (this.flipped) {
            this.x -= this.speed * modifier;
        } else {
            this.x += this.speed * modifier;
        }
    }

    render(ctx) {
        ctx.fillStyle = '#989898';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

module.exports = Laser;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map