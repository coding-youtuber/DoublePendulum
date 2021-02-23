
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pendulum

// A Simple Pendulum Class

// This constructor could be improved to allow a greater variety of pendulums
let gravity = 0.4; // Arbitrary constant

class ParentPendulum {

  constructor(x, y, r) {
    this.childPendulum;

    // Fill all variables
    this.origin = createVector(x, y);
    this.position = createVector();
    this.r = r;
    this.angle = PI / 4;

    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.995; // Arbitrary damping
    this.ballr = 48.0; // Arbitrary ball radius
    this.mass = 1;
  }

  setTheOther(p) {
  }

  // Function to update position
  update() {
    let alpha = -gravity * (2 * this.mass + this.childPendulum.mass) * sin(this.angle) - this.childPendulum.mass * gravity * sin(this.angle - 2 * this.childPendulum.angle) - 2 * sin(this.angle - this.childPendulum.angle) * this.childPendulum.mass * (this.childPendulum.aVelocity * this.childPendulum.aVelocity * this.childPendulum.r + this.aVelocity * this.aVelocity * this.r * cos(this.angle - this.childPendulum.angle));

    let beta = this.r * (2 * this.mass + this.childPendulum.mass - this.childPendulum.mass * cos(2 * this.angle - 2 * this.childPendulum.angle));

    this.aAcceleration = alpha / beta;

    // this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle); // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
    this.aVelocity += this.aAcceleration; // Increment velocity
    this.aVelocity *= this.damping; // Arbitrary damping
    this.angle += this.aVelocity; // Increment angle
  }

  display() {
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0); // Polar to cartesian conversion
    this.position.add(this.origin); // Make sure the position is relative to the pendulum's origin

    stroke(255);
    strokeWeight(2);
    // Draw the arm
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(127);
    // Draw the ball
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  }
}

class ChildPendulum {

  constructor(r) {
    this.parentPendulum;
    this.origin;

    // Fill all variables
    this.position = createVector();
    this.r = r;
    this.angle = PI / 4;

    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.995; // Arbitrary damping
    this.ballr = 100.0; // Arbitrary ball radius
    this.mass = 1;
  }

  // setTheOther(p) {
  // }

  // Function to update position
  update(p) {

    let gunnma = 2 * sin(this.parentPendulum.angle - this.angle) * (this.parentPendulum.aVelocity * this.aVelocity * this.parentPendulum.r * (this.parentPendulum.mass + this.mass) + gravity * (this.parentPendulum.mass + this.mass) * cos(this.parentPendulum.angle) + this.aVelocity * this.aVelocity * this.r * this.mass * cos(this.parentPendulum.angle - this.angle));
    let phai = this.r * (2 * this.parentPendulum.mass + this.mass - this.mass * cos(2 * this.parentPendulum.angle - 2 * this.angle));

    this.aAcceleration = gunnma / phai;

    // this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle); // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
    this.aVelocity += this.aAcceleration; // Increment velocity
    this.aVelocity *= this.damping; // Arbitrary damping
    this.angle += this.aVelocity; // Increment angle
  }

  display() {
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0); // Polar to cartesian conversion
    this.position.add(this.origin); // Make sure the position is relative to the pendulum's origin

    stroke(255);
    strokeWeight(2);
    // Draw the arm
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(127);
    // Draw the ball
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  }
}

let parentPendulum;
let childPendulum;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  parentPendulum = new ParentPendulum(width / 2, 0, 175);
  childPendulum = new ChildPendulum(300);

  // childPendulum.setTheOther(parentPendulum);
  // parentPendulum.setTheOther(childPendulum);
}

function draw() {
  background("#ccc");
  parentPendulum.childPendulum = childPendulum;
  parentPendulum.update();
  parentPendulum.display();

  childPendulum.parentPendulum = parentPendulum;
  childPendulum.origin = createVector(parentPendulum.position.x, parentPendulum.position.y);
  childPendulum.update();
  childPendulum.display();
}