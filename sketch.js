document.addEventListener('touchmove', function (n) {
  n.preventDefault();
}, {
  passive: false
});
let state = -1;
let doubleClick, ts = [];
let points = [];
let k = 5;
let kMoyen = [];
let kPoints = [];
let dis = [];
let colors = [];

function setup() {
  frameRate(3);
  createCanvas(windowWidth, windowHeight);

  noCursor();
  textSize(30);

  for (let i = 0; i < 800; i++) {
    let dump = createVector(random(0, width), random(0, height));
    points.push(dump);
  }

  kMoyen = [...points].slice(0, k);
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
  // console.log(x);
  return createVector(x, y);
}

function draw() {
  background(0);
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
    // console.log(n);
    kPoints[n].push(points[i]);
    // let dis0 = p5.Vector.dist(points[i], kMoyen[0]);
    // let dis1 = p5.Vector.dist(points[i], kMoyen[1]);
    // let dis2 = p5.Vector.dist(points[i], kMoyen[2]);
    // (dis0 < dis1) && (dis0 < dis2) ? k0.push(points[i]): "";
    // (dis1 < dis2) && (dis1 < dis0) ? k1.push(points[i]): "";
    // (dis2 < dis1) && (dis2 < dis0) ? k2.push(points[i]): "";
  }
  for (let i = 0; i < kPoints.length; i++) {
    kMoyen[i] = aver(kPoints[i]);
  }
  // kMoyen[0] = aver(k0);
  // kMoyen[1] = aver(k1);
  // kMoyen[2] = aver(k2);
  // kPoints[0].forEach(a => {
  //   fill(255, 0, 0, 180);
  //   ellipse(a.x, a.y, 10, 10)
  // })
  // ellipse(kMoyen[0].x, kMoyen[0].y, k0.length / 3);

  for (let i = 0; i < kPoints.length; i++) {
    fill(colors[i]);
    kPoints[i].forEach(a => {
      ellipse(a.x, a.y, 10, 10)
    })
    ellipse(kMoyen[i].x, kMoyen[i].y, kPoints[i].length / 3);
  }


  for (let i = 0; i < kPoints.length; i++) {
    kPoints[i] = [];
  }
  // console.log(kPoints);
  // console.log(kMoyen);

}





document.touchmove = function (n) {
  n.preventDefault();
}