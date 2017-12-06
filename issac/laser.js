const MovingObject = require("./moving_object");

class Laser extends MovingObject {
  constructor(options) {
    options.radius = Laser.RADIUS;
    super(options);
  }
}

Laser.RADIUS = 3;
Laser.SPEED = 30;

module.exports = Laser;
