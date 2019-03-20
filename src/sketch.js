
var cities = [];
var shortest = [];

function setup() {
  createCanvas(400,400);


}

function draw() {
  background(170);
  fill(20,186,34);
  noStroke();
  rect(0, height-30, 80, 30);
  fill(0);
  text("Brute force", 5, height-10);
  for(var i = 0; i < cities.length; i++){
    cities[i].show();
  }
  drawPath(shortest);
  //ellipse(10,10,10,10);
}

function mouseClicked() {
  if(mouseX < 80 && mouseY > height-30){
    permute(cities);
  }
  else{
    if(!(mouseX > width-1 || mouseX < 0 || mouseY > height-1 || mouseY < 0)){
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
