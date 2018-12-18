document.addEventListener('touchmove', function (n) {
  n.preventDefault();
}, {
  passive: false
});
let state = -1;
let doubleClick, ts = [];
let mic, osc, filt;
let points = [];
let ks = [];
let k0 = [];
let k1 = [];
let k2 = [];
let k = 20;
let kss = [];
let dis = [];
let colors = [];

function setup() {
  frameRate(3);
  mic = new p5.AudioIn();
  mic.start();
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator();
  osc.disconnect();
  osc.connect(filt);
  osc.setType('sawtooth');
  osc.start();
  osc.freq(0);
  noCursor();
  textSize(30);
  for (let i = 0; i < 800; i++) {
    let dump = createVector(random(0, width), random(0, height));
    points.push(dump);
  }
  ks = [...points].slice(0, k);
  for (let i = 0; i < ks.length; i++) {
    kss[i] = [];
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
    for (let t = 0; t < kss.length; t++) {
      dis[t] = p5.Vector.dist(points[i], ks[t]);
    }
    let t = Math.min(...dis);
    let n = dis.indexOf(t);
    // console.log(n);
    kss[n].push(points[i]);
    // let dis0 = p5.Vector.dist(points[i], ks[0]);
    // let dis1 = p5.Vector.dist(points[i], ks[1]);
    // let dis2 = p5.Vector.dist(points[i], ks[2]);
    // (dis0 < dis1) && (dis0 < dis2) ? k0.push(points[i]): "";
    // (dis1 < dis2) && (dis1 < dis0) ? k1.push(points[i]): "";
    // (dis2 < dis1) && (dis2 < dis0) ? k2.push(points[i]): "";
  }
  for (let i = 0; i < kss.length; i++) {
    ks[i] = aver(kss[i]);
  }
  // ks[0] = aver(k0);
  // ks[1] = aver(k1);
  // ks[2] = aver(k2);
  // kss[0].forEach(a => {
  //   fill(255, 0, 0, 180);
  //   ellipse(a.x, a.y, 10, 10)
  // })
  ellipse(ks[0].x, ks[0].y, k0.length / 3);
  for (let i = 0; i < kss.length; i++) {
    fill(colors[i]);
    kss[i].forEach(a => {
      ellipse(a.x, a.y, 10, 10)
    })
    ellipse(ks[i].x, ks[i].y, kss[i].length / 3);


  }
  for (let i = 0; i < kss.length; i++) {
    kss[i] = [];
  }
  console.log(kss);



  // console.log(ks);


}









document.touchmove = function (n) {
  n.preventDefault();
}