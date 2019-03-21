
var cities = [];
var shortest = [];
var b;

function setup() {
  createCanvas(400,400);
  b = new Button(0, height-30, 70, 30, "Brute Force", 10, [20,186,34],
      [10, 176, 24], permute);

}

function draw() {
  background(170);
  b.display();
  noStroke();
  for(var i = 0; i < cities.length; i++){
    cities[i].show();
  }
  drawPath(shortest);
}

function mouseClicked() {
  b.checkClicked(mouseX, mouseY)
  if(!(mouseX > width-1 || mouseX < 0 || mouseY > height-1 || mouseY < 0)){
    if(!b.checkHover(mouseX, mouseY)){
      cities.push(new City(mouseX, mouseY));
    }
  }
}

function drawPath(input){

  if(input.length < 2){
    return;
  }

  for(var i = 1; i < input.length; i++){
    stroke(255);
    line(input[i-1].x, input[i-1].y, input[i].x, input[i].y);
    noStroke();
  }

}

function calcDistance(input) {

  if(input.length < 2){
    return -1;
  }

  var sum = 0;

  for(var i = 1; i < input.length; i++){

    sum += dist(input[i-1].x, input[i-1].y, input[i].x, input[i].y);

  }

  return sum;

}

function permute(){

  let input = cities;

  var minDist = 99999999;
  var minPath = [];

  var permArr = [],
    usedChars = [];

  p_helper(input);

  function p_helper(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length == 0) {
        //permArr.push(usedChars.slice());
        let tempPath = usedChars.slice();
        let tempDist = calcDistance(tempPath);
        if(tempDist < minDist){
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
  shortest = minPath;
  return minPath;

};
