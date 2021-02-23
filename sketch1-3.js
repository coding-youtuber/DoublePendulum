
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#000000");

  strokeWeight(10);
  stroke("#ffffff");

  // 白い線を描画
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = 400;
  let endPointY = 300;
  line(startPointX, startPointY, endPointX, endPointY);
}