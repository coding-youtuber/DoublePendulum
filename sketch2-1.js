// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pendulum

// A Simple Pendulum Class

/*

こちらを参考にしています
noc-examples-p5.js/pendulum.js at master · nature-of-code/noc-examples-p5.js
https://github.com/nature-of-code/noc-examples-p5.js/blob/master/chp03_oscillation/NOC_3_10_PendulumExampleSimplified/pendulum.js
*/

// This constructor could be improved to allow a greater variety of pendulums
class Pendulum {

  constructor(x, y, r) {
    // Fill all variables
    // ひもの始点
    this.origin = createVector(x, y);
    // ボールの位置ベクトル
    this.position = createVector();
    // ひもの長さ
    this.r = r;
    // ひもの角度
    this.angle = PI / 4;

    // 角速度
    this.aVelocity = 0.0;
    // 角加速度
    this.aAcceleration = 0.0;
    // 減衰係数（1未満の時、徐々に振り子の動きは静止状態に近づいていく）
    this.damping = 0.995;
    // ボールの半径
    this.ballr = 48.0;
  }

  // Function to update position
  update() {
    // 重力、浮きやすくするために弱めにしてある
    let gravity = 0.4;
    // 角加速度を計算
    this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle); // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)

    // 角速度を更新。角加速度を足す。
    this.aVelocity += this.aAcceleration;
    // 速度を減衰させる
    this.aVelocity *= this.damping;
    // 角度を更新。角速度を足す。
    this.angle += this.aVelocity;
  }

  display() {
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0); // Polar to cartesian conversion
    this.position.add(this.origin); // Make sure the position is relative to the pendulum's origin

    // 線の設定、色と太さ
    stroke(255);
    strokeWeight(2);
    // ひもを描画
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(127);
    // ボールを描画
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  }
}

let pendulum;
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  pendulum = new Pendulum(width / 2, 0, 175);

}

function draw() {
  background("#ccc");
  pendulum.update();
  pendulum.display();
}