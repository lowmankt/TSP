class Button {

  constructor(x, y, width, height, text, fontSize, color, hoverColor, action){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.fontSize = fontSize;
    this.color = color;
    this.hoverColor = hoverColor;
    this.action = action;
  }

  checkClicked(){
    if(mouseX < this.x + this.width && mouseX >= this.x && mouseY >= this.y
      && mouseY < this.y + this.height){
      this.action();
    }
  }

  checkHover(mX, mY){
    return mouseX < this.x + this.width && mouseX >= this.x && mouseY >= this.y
    && mouseY < this.y + this.height;
  }

  display(){
    if(this.checkHover()){
      fill(this.hoverColor[0], this.hoverColor[1], this.hoverColor[2]);
    }
    else{
      fill(this.color[0], this.color[1], this.color[2]);
    }
    rect(this.x, this.y, this.width, this.height);
    fill(0);
    textSize(this.fontSize);
    textAlign(CENTER);
    text(this.text, this.x + this.width/2, this.y + this.height/1.75);
  }


}
