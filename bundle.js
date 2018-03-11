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


// import Monster from "./monster";
// import Laser from "./laser";

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.background = new Image();
        this.background.src = "./assets/canvas_background.png";
        
        this.hero = new __WEBPACK_IMPORTED_MODULE_0__hero___default.a(100, 100);
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
                // console.log(this.points);
                this.remove(coin);
                return true;
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
        // console.log(this.allObjects());
        this.checkCollisions();
        this.updatePoints();
        this.allObjects().forEach((obj) => obj.render(this.ctx));
    }

    render() {
        if (this.paused) {
            requestAnimationFrame(this.render.bind(this));
        } else {
            const now = Date.now();
            var delta = now - then;
            // console.log(delta);
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

    togglePause() {
        if (this.paused === false) {
            this.paused = true;
            this.hero.paused = true;
        } else {
            this.paused = false;
            this.hero.paused = false;
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
Game.NUM_COINS = 4;

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
        this.leftLasers = [];
        this.rightLasers = [];
        this.keysDown = {};

        document.addEventListener("keydown", e => {
            // console.log('key down');
            if (this.paused) {
                this.keysDown = {};
            } else {
                this.keysDown[e.keyCode] = true;
                // console.log(this.keysDown);
            }
        }, false);

        document.addEventListener("keyup", e => {
            // console.log('key up');
            if (this.paused) {
                this.keysDown = {};
            } else {
                // console.log(this.keysDown);
                delete this.keysDown[e.keyCode];
                // console.log(this.keysDown);
            }
        }, false);
    } 

    move(modifier) {
        // holding left, 'a' or arrow
        if (65 in this.keysDown || 37 in this.keysDown)  {
            if (this.x > 30) {    
                this.x -= this.speed * modifier;
                this.flipped = true;
            }
        }
        // holding right, 'd' or arrow
        if (68 in this.keysDown || 39 in this.keysDown) {
            if (this.x < 600) {
                this.x += this.speed * modifier;
                this.flipped = false;
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
            if (this.y < 420) {    
                this.y += this.speed * modifier;
            }
        }
        // shoot a laser
        if (32 in this.keysDown) {
            if (this.flipped) {
                this.leftLasers.push([this.x - 15, this.y + 30, 20, 5]);
            }
            else {
                this.rightLasers.push([this.x + 55, this.y + 30, 20, 5]);
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
        // console.log("moving");
        for (let i = 0; i < this.leftLasers.length; i++) {
            if (this.leftLasers[i][0] > 0) {
                this.leftLasers[i][0] -= 10;
            } else if (this.leftLasers[i][0] < 0) {
                this.leftLasers.splice(i, 1);
            }
        }
        for (let i = 0; i < this.rightLasers.length; i++) {
            if (this.rightLasers[i][0] < 660) {
                this.rightLasers[i][0] += 10;
            } else if (this.rightLasers[i][0] > 660) {
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

    collideWith(obj2) {
        if (Math.sqrt( Math.pow((this.x - obj2.x), 2) + Math.pow((this.y - obj2.y), 2) ) <= 50) {
            // console.log("collision");
            return true;
        }
        // else if (obj1.y <= obj2.y) {
        //     return true;
        // } 
        else {
            return false;
        }
    }
}

module.exports = Coin;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map