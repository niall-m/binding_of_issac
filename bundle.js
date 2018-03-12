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
    game.start();
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

        this.hero = new __WEBPACK_IMPORTED_MODULE_0__hero___default.a(300, 200);
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

    remove(object) {
        if (object instanceof __WEBPACK_IMPORTED_MODULE_1__coin___default.a) {
            this.coins.splice(this.coins.indexOf(object), 1);
        } else if (object instanceof __WEBPACK_IMPORTED_MODULE_0__hero___default.a) {
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
            const c = new __WEBPACK_IMPORTED_MODULE_1__coin___default.a(
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
                const m = new __WEBPACK_IMPORTED_MODULE_2__monster___default.a(
                    0,
                    this.randomInt(0, Game.HEIGHT - 110),
                    true
                );
                this.leftMonsters.push(m);
            } else {
                const m = new __WEBPACK_IMPORTED_MODULE_2__monster___default.a(
                    Game.WIDTH - 100,
                    this.randomInt(0, Game.HEIGHT - 110),
                    false
                );
                this.rightMonsters.push(m);
            }
        }
    }

    moveMonsters(modifier) {
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

    allObjects() {
        return [].concat(this.hero, this.coins, this.leftMonsters, this.rightMonsters);
    }

    renderAllObjects() {
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

            this.moveMonsters(delta / 1000);
            this.hero.moveLaser();
            this.hero.move(delta / 1000);

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

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Hero {
    constructor(x, y) {
        this.speed = 300;
        this.x = x;
        this.y = y;
        this.heroImage = new Image();
        this.heroImage.src = "./assets/knight.png";
        this.flipped = false;
        this.paused = false;
        this.sound = true;
        this.totalLasers = 2;
        this.leftLasers = [];
        this.rightLasers = [];
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            if (this.paused) {
                this.keysDown = {}; // removes all actions failsafe
            } else if (e.keyCode === 32 && this.leftLasers.length + this.rightLasers.length <= this.totalLasers) {
                if (this.sound) {
                    let laserSound = new Audio("./assets/laser.wav");
                    laserSound.volume = 0.07;
                    laserSound.play();
                }
                if (this.flipped) {
                    this.leftLasers.push([this.x - 15, this.y + 30, 25, 5]);
                } else {
                    this.rightLasers.push([this.x + 55, this.y + 30, 25, 5]);
                }
            } else { // movement
                this.keysDown[e.keyCode] = true;
            }
        }, false);

        document.addEventListener("keyup", e => {
            if (e.keyCode === 32) {
                e.preventDefault(); // prevents spacebar toggling music
            } else if (this.paused) {
                this.keysDown = {};
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

    drawLaser(ctx) {
        ctx.fillStyle = '#989898';
        if (this.leftLasers.length) {
            for (let i = 0; i < this.leftLasers.length; i++) {
                ctx.fillRect(this.leftLasers[i][0],this.leftLasers[i][1],this.leftLasers[i][2],this.leftLasers[i][3]);
            }
        }
        if (this.rightLasers.length) {
            for (let i = 0; i < this.rightLasers.length; i++) {
                ctx.fillRect(this.rightLasers[i][0],this.rightLasers[i][1],this.rightLasers[i][2],this.rightLasers[i][3]);
            }
        }
    }

    moveLaser() {
        for (let i = 0; i < this.leftLasers.length; i++) {
            if (this.leftLasers[i][0] > 0) {
                // move laser 10 pixels per animation tick if in bounds
                this.leftLasers[i][0] -= 10;
            } else {
                this.leftLasers.splice(i, 1);
                // remove laser from array if out of bounds of canvas
            }
        }
        for (let i = 0; i < this.rightLasers.length; i++) {
            if (this.rightLasers[i][0] < 660) {
                this.rightLasers[i][0] += 10;
            } else {
                this.rightLasers.splice(i, 1);
            }
        }
    }
      

    render(ctx) {
        if (this.flipped) {
            ctx.scale(-1,1);
            ctx.drawImage(this.heroImage, -this.x - 60, this.y, 60, 60);
            ctx.scale(-1,1);
        }
        else {
            ctx.drawImage(this.heroImage, this.x, this.y, 60, 60);
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
        this.width = 46;
        this.height = 50;
        this.coinImage = new Image();
        // this.coinImage.src = "https://i.imgur.com/SJtG1rE.png";
        this.coinImage.src = "./assets/coin-sprite.png";
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = this.ticksPerFrame || 4;
        this.numberOfFrames = this.numberOfFrames || 10;
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
            // this.frameIndex += 1;
          }
    }

    collideWith(obj2) {
        if (Math.sqrt( Math.pow((this.x - obj2.x), 2) + Math.pow((this.y - obj2.y), 2) ) <= 50) {
            return true;
        } else {
            return false;
        }
    }

    render(ctx) {
        this.update(this);
        ctx.drawImage(
            this.coinImage,
            this.frameIndex * 1000 / this.numberOfFrames,
            0,
            1000 / this.numberOfFrames,
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
            ctx.drawImage(this.monsterImage, -this.x - 100, this.y, 100, 100);
            ctx.scale(-1,1);
        } else {
            ctx.drawImage(this.monsterImage, this.x, this.y, 100, 100);
        }
    }
}

module.exports = Monster;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map