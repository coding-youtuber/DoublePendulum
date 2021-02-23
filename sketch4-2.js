
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pendulum

// A Simple Pendulum Class

// This constructor could be improved to allow a greater variety of pendulums
let gravity = 1; // Arbitrary constant
let buffer;

let px = -1;
let py = -1;

let parentPendulum;
let childPendulum;


class Pendulum {

  constructor({x = 0, y = 0, r = 1, angle = PI /2, aVelocity = 0, aAcceleration = 0.1, damping = 1, ballr = 15, mass = 10} = {}) {
    this.origin = createVector(x, y);
    this.position = createVector();
    this.r = r;
    this.angle = angle;

    this.aVelocity = aVelocity;
    this.aAcceleration = aAcceleration;
    this.damping = damping; // Arbitrary damping
    this.ballr = ballr; // Arbitrary ball radius
    this.mass = mass;
    this.lifespan = 255.0;
    this.lifeSpeed = 1;
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

    this.p.lifespan -= this.p.lifeSpeed;
  }

  display(isChild) {
    this.p.position.set(this.p.r * sin(this.p.angle), this.p.r * cos(this.p.angle), 0); // Polar to cartesian conversion
    this.p.position.add(this.p.origin); // Make sure the position is relative to the pendulum's origin

    // if(isChild) {
    //   stroke(100);
    //   strokeWeight(1);
    // } else {

    // }
    stroke(100);
    strokeWeight(1);
    // Draw the arm
    line(this.p.origin.x, this.p.origin.y, this.p.position.x, this.p.position.y);
    ellipseMode(CENTER);

    if(isChild) {
      noStroke();
      // if(this.p.lifespan > 0){
      //   console.log(this.p.lifespan);
        
      //   // fill('rgba(0,255,0, '+ this.p.lifespan / 255 + ')');
      // fill("#c7ffd8");
      // }
      fill("#c7ffd8");
    } else {
      fill("#ccc");
    }
    // noFill();
    // Draw the ball
    ellipse(this.p.position.x, this.p.position.y, this.p.ballr, this.p.ballr);
  }

}


class ParentPendulum extends PendulumSystem {

  constructor(x, y, r) {
    let p = new Pendulum({x: x, y: y, r: r, aVelocity: 0, mass: 10});
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
    let p = new Pendulum({r: r, ballr : 15, aVelocity: 0.1, mass: 1.0});

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



function setup() {
  pixelDensity(1);
  
  createCanvas(windowWidth, windowHeight);
  // createCanvas(600, 400);

  buffer = createGraphics(width, height);
  buffer.background(0);
  // buffer.translate(cx, cy);

  parentPendulum = new ParentPendulum(width / 2, height / 3 - 50, height / 4 * 2);
  childPendulum = new ChildPendulum((height / 10) * 2);
  
  childPendulum.parentPendulum = parentPendulum.p;
  parentPendulum.childPendulum = childPendulum.p;
  background(0);
}

function draw() {
  background(0,0,0, 8);
  // background(0);
  image(buffer, 0, 0, width, height);
  parentPendulum.childPendulum = childPendulum.p;
  parentPendulum.update();
  parentPendulum.display(false);

  childPendulum.parentPendulum = parentPendulum.p;

  childPendulum.update();
  childPendulum.display(true);

  if(frameCount > 1) {
    buffer.strokeWeight(5);
    buffer.stroke('rgba(0,255,0,0.25)');
    // buffer.stroke("#8ac4d0");

    buffer.line(px, py, childPendulum.p.position.x, childPendulum.p.position.y);
  }

  px = childPendulum.p.position.x;
  py = childPendulum.p.position.y;
}

function mousePressed() {
  background(0);
}