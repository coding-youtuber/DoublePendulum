
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#000000");

  strokeWeight(10);
  stroke("#ffffff");


  // 10本線を引く。位置はランダム。
  for(var i = 0; i < 10; i++) {
    let startPointX = random(width);
    let startPointY = 0;
    let endPointX = startPointX;
    let endPointY = height;

    line(startPointX, startPointY, endPointX, endPointY);
  }
}