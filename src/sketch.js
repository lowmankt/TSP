var cities = [];
var shortest = [];
var buttons = [];
var time = 0;

//// TODO:
//      Create array of buttons or add to setupButtons and checkButtons

function setup() {
  createCanvas(600, 600);
  buttonSetup();
}

function draw() {
  background(170);
  buttonDisplay();
  noStroke();

  textAlign(LEFT);
  text("Cities: "+cities.length, 10, 15);

  if (shortest.length > 1) {
    text("Distance: "+calcDistance(shortest), 10, 30);
    text("Time: "+time+"ms", 10, 45);
  }

  for (var i = 0; i < cities.length; i++) {
    cities[i].show();
  }
  drawPath(shortest);
}

//USER INTERFACE

function buttonSetup() {
  buttons.push(new Button(0, height - 40, 100, 40, "Brute Force", 14, [20, 186, 34],
    [10, 176, 24], permute));
  buttons.push(new Button(110, height - 40, 100, 40, "Nearest Neighbor", 10, [20, 186, 34],
    [10, 176, 24], nearestNeighbor));
}

function buttonDisplay() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}

function buttonHoverCheck() {
  let hovering = false;
  for (let i = 0; i < buttons.length; i++) {
    hovering = buttons[i].checkHover();
    if (hovering) {
      return hovering;
    }
  }
  return hovering;
}

function buttonClickCheck() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].checkClicked();
  }
}

function mouseClicked() {

  buttonClickCheck();
  if (!(mouseX > width - 1 || mouseX < 0 || mouseY > height - 1 || mouseY < 0)) {
    if (!buttonHoverCheck()) {
      cities.push(new City(mouseX, mouseY));
    }
  }

}

function drawPath(input) {

  if (input.length < 2) {
    return;
  }
  for (var i = 1; i < input.length; i++) {
    stroke(255);
    line(input[i - 1].x, input[i - 1].y, input[i].x, input[i].y);
    noStroke();
  }

}

//SOLVING

function nearestNeighbor() {
  t0 = window.performance.now();
  if (cities.length < 2) {
    return;
  }
  for (let j = 0; j < cities.length; j++) {
    var shortestPath;
    var shortestDist = 99999999;

    var ready = [...cities];
    var visited = [];

    visited.push(ready.splice(0, 1)[0]);
    while (ready.length != 0) {
      let closestIndex = -1;
      let num = 99999999;

      for (let i = 0; i < ready.length; i++) {

        let prevCity = visited[visited.length - 1];
        let tempDist = dist(prevCity.x, prevCity.y, ready[i].x, ready[i].y);
        if (tempDist < num) {
          num = tempDist;
          closestIndex = i;
        }
      }

      visited.push(ready.splice(closestIndex, 1)[0]);
    }
  }
  shortest = visited;
  t1 = window.performance.now();
  time = t1 - t0;
  return visited;

}

function calcDistance(input) {
  if (input.length < 2) {
    return -1;
  }
  var sum = 0;
  for (var i = 1; i < input.length; i++) {
    sum += dist(input[i - 1].x, input[i - 1].y, input[i].x, input[i].y);
  }
  return sum;
}

function permute() {
  t0 = window.performance.now();
  var input = cities;
  var minDist = 99999999;
  var minPath = [];
  var permArr = [],
    usedChars = [];
  p_helper(input);
  shortest = minPath;
  t1 = window.performance.now();
  time = t1 - t0;
  return minPath;

  function p_helper(input) {
    var i, ch;

    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length == 0) {
        let tempPath = usedChars.slice();
        let tempDist = calcDistance(tempPath);
        if (tempDist < minDist) {
          minDist = tempDist;
          minPath = tempPath;
        }
        permArr.push(tempPath);
      }
      p_helper(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }

    return permArr
  };


};
