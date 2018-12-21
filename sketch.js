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
let [Video, vScale] = ["", 3];
let kScale = 60;

function preload() {
  img = loadImage("assets/3.jpg");
}

function setup() {
  pixelDensity(1.0);

  createCanvas(windowWidth, windowHeight);
  if (height > width) {
    vScale = 9;
    kScale = 150;
  }
  Video = createCapture(Video);
  Video.loop();
  Video.hide();
  Video.size(width / vScale, height / vScale);

  // count=0, pixelPos=[];
  img.resize(width, height);
  // img.loadPixels();

  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     let index = (width * y + x) * 4;
  //     let lumi = img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2] + img.pixels[index + 3];
  //     if (lumi < 800) {
  //       count++;
  //     }
  //   }
  // }
  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     let index = (width * y + x) * 4;
  //     let lumi = img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2] + img.pixels[index + 3];
  //     if (lumi < 800 && Math.random() > 1 - (constrain(width * height * 0.02, 7000, 20000) / count)) {
  //       let ee = createVector(x, y);
  //       pixelPos.indexOf(ee) === -1 ? pixelPos.push(ee) : '';
  //     }
  //   }
  // }

  // noCursor();
  textSize(30);
  for (let i = 0; i < 10000; i++) {
    let dump = createVector(random(0.3 * width, 0.7 * width), random(0.3 * height, 0.7 * height));
    points.push(dump);
  }

  // points = pixelPos;
  // points = [];
  kMoyen = [...points].slice(0, k + 1);

  for (let i = 0; i < k + 1; i++) {
    kMoyen[k] = createVector(random(width / 2, width / 2.1), random(width / 2, width / 2.1));
  }
  for (let i = 0; i < kMoyen.length + 1; i++) {
    kPoints[i] = [];
    colors[i] = [random(100, 255), random(50, 255), random(100, 500), 200];
  }
}

function aver(arr) {
  if (arr.length === 0) {
    return createVector(0, 0);
  }
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
  points = [];
  Video.loadPixels();
  loadPixels();
  let bris = [];
  // median
  for (let y = 0; y < Video.height; y++) {
    for (let x = 0; x < Video.width; x++) {
      let index = (Video.width - x + 1 + (y * Video.width)) * 4;
      let r = Video.pixels[index + 0];
      let g = Video.pixels[index + 1];
      let b = Video.pixels[index + 2];
      let bright = (r + g + b) / 3;
      bris.push(bright);
    }
  }
  bris.sort((a, b) => a > b);
  let median = bris[Math.floor(bris.length / 2.5)];
  // video pixels calcultation
  for (let y = 0; y < Video.height; y++) {
    for (let x = 0; x < Video.width; x++) {
      var index = (Video.width - x + 1 + (y * Video.width)) * 4;
      let r = Video.pixels[index + 0];
      let g = Video.pixels[index + 1];
      let b = Video.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let ee = createVector(x * vScale, y * vScale);
      ee.r = r;
      ee.g = g;
      ee.b = b;
      bright < 90 ? points.push(ee) : "";
    }
  }
  // mouse as the k+1 center
  kMoyen[k + 1] = createVector(mouseX, mouseY);

  background(0);
  // text
  noStroke();
  textAlign(CENTER);
  fill(255);
  text("K Means", width / 2, height * 0.8);
  // k means : calculate center for each pixel and refresh centers afterwards
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
    stroke(colors[i]);
    kPoints[i].forEach(a => {
      // ellipse(a.x + Math.random(), a.y - Math.random(), height > width ? 4 : 2);
      line(a.x + Math.random(), a.y - Math.random(), a.x + 4, a.y - 4);

    })
    fill(colors[i][0], colors[i][1], colors[i][2], 100);
    i === kMoyen.length - 1 ? fill(200, 0, 180, 200) : "";
    ellipse(kMoyen[i].x, kMoyen[i].y, Math.sqrt(kPoints[i].length) / k * kScale);
  }
  // reset pixels in each center every time
  for (let i = 0; i < kMoyen.length; i++) {
    kPoints[i] = [];
  }
}

document.touchmove = function (n) {
  n.preventDefault();
}