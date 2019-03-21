class City {

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  show() {
    fill(0);
    ellipse(this.x, this.y, 10, 10);
  }

}
