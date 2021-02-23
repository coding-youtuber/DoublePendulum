
let ColorPalette = ["#F0F5F9", "#C9D6DF", "#52616B", "#1E2022"];

function setup() {
  let xoff = 1;
  let density = 1;

  createCanvas(windowWidth, windowHeight);

  let randBgColor = getRandomElement(ColorPalette);
  background(randBgColor);

  strokeWeight(10);

  // 始点を変更
  for(var i = 0; i < width; i+=density) {
    let startPointX = i;
    let startPointY = 0;
    let endPointX = noise(xoff) * width;
    let endPointY = height;

    let randStrokeColor = getRandomElement(ColorPalette);
    stroke(randStrokeColor);
    line(startPointX, startPointY, endPointX, endPointY);

    xoff += 0.001;
  }
}

function getRandomElement(arry) {
  let randIndex = Math.floor(random(arry.length))
  return arry[randIndex];
}