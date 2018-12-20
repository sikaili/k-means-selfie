function touchStarted() {
  state = 1;
}

function touchEnded() {
  state = 0;
  // starting points cases
  let n = Math.floor(Math.random() * 3) + 1;
  switch (n) {
    case 1:
      {
        for (let i = 0; i < k + 1; i++) {
          kMoyen[i] = points[Math.floor(Math.random() * points.length)];
        }
      }
    case 2:
      {
        kMoyen = points.slice(0, k + 1);
      }
    case 3:
      {
        kMoyen = points.slice(Math.floor(points.length / 2), Math.floor(points.length) + k + 1);
      }
  }
  // rest points for each center and set Color
  for (let i = 0; i < kMoyen.length; i++) {
    kPoints[i] = [];
    colors[i] = [random(100, 500), random(50, 255), random(100, 555), 200];
  }
}

function keyPressed() {
  if (keyCode == 189 || keyCode == 187) {

  }
}

function addSnapshot(id) {
  var dumps = [];
  console.log(dumps);
  localStorage.setItem("canvas-" + id, JSON.stringify(dumps))
}

function removeSnapshot(id) {
  localStorage.removeItem("canvas-" + id);
}

function getSnapshot(id) {
  var canvas = JSON.parse(localStorage.getItem("canvas-" + id));
  // var canvas = JSON.parse(myJSON);
  return canvas;
}

function resetAllSnapshots() {
  localStorage.clear();
}


function windowResized() {
  setTimeout(location.reload(), 200);
}