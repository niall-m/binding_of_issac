// const MovingObject = require("./moving_object");
// const Util = require("./util");

class Laser extends MovingObject {
    constructor(options) {
        super(options);
        this.speed = 30;
        this.radius = 3;
    }
}

module.exports = Laser;

const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    // console.log(options.vel);
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    // console.log(this.vel);
    // console.log("moving_object.move");
    debugger;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;


const Util = {
    // Normalize the length of the vector to 1, maintaining direction.
    dir (vec) {
      var norm = Util.norm(vec);
      return Util.scale(vec, 1 / norm);
    },
    // Find distance between two points.
    dist (pos1, pos2) {
      return Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
      );
    },
    // Find the length of the vector.
    norm (vec) {
      return Util.dist([0, 0], vec);
    },
    // Return a randomly oriented vector with the given length.
    randomVec (length) {
      var deg = 2 * Math.PI * Math.random();
      return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale (vec, m) {
      return [vec[0] * m, vec[1] * m];
    },
  };
  
  module.exports = Util;
  