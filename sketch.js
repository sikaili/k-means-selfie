document.addEventListener('touchmove', function (n) {
  n.preventDefault();
}, {
  passive: false
});
let state = -1;
let doubleClick, ts = [];
let points = [];
let k = 50;
let kMoyen = [];
let kPoints = [];
let dis = [];
let colors = [];
let pixelPos = [];
let img;
let count = 0;
let [video, vScale] = ["", 16];

function preload() {
  img = loadImage("assets/3.jpg"); // Load the image
}

function setup() {
  // pixelDensity(1);
  // video = createCapture(VIDEO);

  createCanvas(windowWidth, windowWidth * 0.7 > windowHeight ? windowHeight : windowWidth * 0.7);
  // video.size(width / vScale, height / vScale);
  // count=0, pixelPos=[];
  img.loadPixels();
  img.resize(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (width * y + x) * 4;
      let lumi = img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2] + img.pixels[index + 3];
      if (lumi < 800) {
        count++;
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (width * y + x) * 4;
      let lumi = img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2] + img.pixels[index + 3];
      if (lumi < 800 && Math.random() > 1 - (constrain(width * height * 0.02, 7000, 20000) / count)) {
        let ee = createVector(x, y);
        pixelPos.indexOf(ee) === -1 ? pixelPos.push(ee) : '';
      }
    }
  }

  noCursor();
  textSize(30);

  for (let i = 0; i < 10000; i++) {
    let dump = createVector(random(0, width), random(0, height));
    points.push(dump);
  }

  points = pixelPos;
  // points = [];
  kMoyen = [...points].slice(0, k);

  for (let i = 0; i < k; i++) {
    kMoyen[k] = createVector(random(width / 2, width / 2.1), random(width / 2, width / 2.1));
  }
  for (let i = 0; i < kMoyen.length; i++) {
    kPoints[i] = [];
    colors[i] = [random(0, 255), random(0, 255), random(0, 255), 180];
  }
}

function aver(arr) {
  let [xs, ys] = [
    [],
    []
  ];
  arr.forEach(obj => {
    xs.push(obj.x);
    ys.push(obj.y);
  })
  let x = xs.reduce((a, b) => a + b) / xs.length;
  let y = ys.reduce((a, b) => a + b) / ys.length;
  return createVector(x, y);
}

function draw() {
  background(0);
  // text
  noStroke();
  textAlign(CENTER);
  fill(255);
  text("K-Moyennes", width / 2, height * 0.8)
  for (let i = 0; i < points.length; i++) {
    for (let t = 0; t < kPoints.length; t++) {
      dis[t] = p5.Vector.dist(points[i], kMoyen[t]);
    }
    let t = Math.min(...dis);
    let n = dis.indexOf(t);
    kPoints[n].push(points[i]);
  }
  for (let i = 0; i < kPoints.length; i++) {
    kMoyen[i] = aver(kPoints[i]);
  }
  // display
  for (let i = 0; i < kPoints.length; i++) {
    fill(colors[i]);
    kPoints[i].forEach(a => {
      ellipse(a.x + Math.random(), a.y - Math.random(), 2, 2)
    })
    fill(colors[i][0], colors[i][1], colors[i][2], 100);
    ellipse(kMoyen[i].x, kMoyen[i].y, Math.sqrt(kPoints[i].length) / k * 60);
  }


  for (let i = 0; i < kMoyen.length; i++) {
    kPoints[i] = [];
  }
}





document.touchmove = function (n) {
  n.preventDefault();
}