
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pendulum

// A Simple Pendulum Class

// This constructor could be improved to allow a greater variety of pendulums
let gravity = 0.4; // Arbitrary constant


class Pendulum {

  constructor({x = 0, y = 0, r = 1, angle = PI /2, aVelocity = 0, aAcceleration = 0, damping = 0.995, ballr = 5, mass = 1} = {}) {
    this.origin = createVector(x, y);
    this.position = createVector();
    this.r = r;
    this.angle = angle;

    this.aVelocity = aVelocity;
    this.aAcceleration = aAcceleration;
    this.damping = damping; // Arbitrary damping
    this.ballr = ballr; // Arbitrary ball radius
    this.mass = mass;
  }
}


class PendulumSystem {

  constructor(p) {
    this.p = p;
  }

  update() {
    this.p.aVelocity += this.p.aAcceleration; // Increment velocity
    this.p.aVelocity *= this.p.damping; // Arbitrary damping
    this.p.angle += this.p.aVelocity; // Increment angle
  }

  display() {
    this.p.position.set(this.p.r * sin(this.p.angle), this.p.r * cos(this.p.angle), 0); // Polar to cartesian conversion
    this.p.position.add(this.p.origin); // Make sure the position is relative to the pendulum's origin

    stroke(20);
    strokeWeight(1);
    // Draw the arm
    line(this.p.origin.x, this.p.origin.y, this.p.position.x, this.p.position.y);
    ellipseMode(CENTER);
    // fill(127);
    noFill();
    // Draw the ball
    ellipse(this.p.position.x, this.p.position.y, this.p.ballr, this.p.ballr);
  }

}


class ParentPendulum extends PendulumSystem {

  constructor(x, y, r) {
    let p = new Pendulum({x: x, y: y, r: r});
    super(p);
    this.childPendulum;
  }

  // Function to update position
  update() {
    let alpha = -gravity * (2 * this.p.mass + this.childPendulum.mass) * sin(this.p.angle) - this.childPendulum.mass * gravity * sin(this.p.angle - 2 * this.childPendulum.angle) - 2 * sin(this.p.angle - this.childPendulum.angle) * this.childPendulum.mass * (this.childPendulum.aVelocity * this.childPendulum.aVelocity * this.childPendulum.r + this.p.aVelocity * this.p.aVelocity * this.p.r * cos(this.p.angle - this.childPendulum.angle));

    let beta = this.p.r * (2 * this.p.mass + this.childPendulum.mass - this.childPendulum.mass * cos(2 * this.p.angle - 2 * this.childPendulum.angle));

    this.p.aAcceleration = alpha / beta;

    super.update();
  }
}

class ChildPendulum extends PendulumSystem {

  constructor(r) {
    let p = new Pendulum({r: r, ballr : 15, aVelocity: 0.01, mass: 2.0});

    super(p);
    this.parentPendulum;
    // this.p = new Pendulum({r: r, ballr : 150});
  }

  update(p) {
    this.p.origin = createVector(this.parentPendulum.position.x, this.parentPendulum.position.y);

    let gunnma = 2 * sin(this.parentPendulum.angle - this.p.angle) * (this.parentPendulum.aVelocity * this.p.aVelocity * this.parentPendulum.r * (this.parentPendulum.mass + this.p.mass) + gravity * (this.parentPendulum.mass + this.p.mass) * cos(this.parentPendulum.angle) + this.p.aVelocity * this.p.aVelocity * this.p.r * this.p.mass * cos(this.parentPendulum.angle - this.p.angle));
    let phai = this.p.r * (2 * this.parentPendulum.mass + this.p.mass - this.p.mass * cos(2 * this.parentPendulum.angle - 2 * this.p.angle));

    this.p.aAcceleration = gunnma / phai;

    // console.log(this.p.position);
    super.update();
    
  }
}


let parentPendulum;
let childPendulum;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  parentPendulum = new ParentPendulum(width / 2, 0, 175);
  childPendulum = new ChildPendulum(500);
  
  childPendulum.parentPendulum = parentPendulum.p;
  parentPendulum.childPendulum = childPendulum.p;
  frameRate(20);
}

function draw() {
  // console.log(frameCount);
  
  background("#ccc");
  parentPendulum.childPendulum = childPendulum.p;
  parentPendulum.update();
  parentPendulum.display();

  childPendulum.parentPendulum = parentPendulum.p;
  // childPendulum.origin = createVector(childPendulum.parentPendulum.position.x, childPendulum.parentPendulum.position.y);

  childPendulum.update();
  childPendulum.display();
}