
function setup() {
  let xoff = 1;
  let density = 10;

  createCanvas(windowWidth, windowHeight);
  background("#000000");

  strokeWeight(10);
  stroke("#ffffff");


  // 線を増やす
  for(var i = 0; i < width; i+=density) {
    let startPointX = random(width);
    let startPointY = 0;
    let endPointX = noise(xoff) * width;
    let endPointY = height;

    line(startPointX, startPointY, endPointX, endPointY);

    xoff += 0.01;
  }
}