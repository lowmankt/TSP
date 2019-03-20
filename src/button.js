class Button {

  constructor(x, y, width, height, text, color, hoverColor, action){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.color = color;
    this.hoverColor = hoverColor;
    this.action = action;
  }

  checkClicked(mX, mY){
    if(mX < this.x + this.width && mX >= this.x && mY >= this.y && mY < this.y + this.height){
      action();
    }
  }

  checkHover(mX, mY){
    return mX < this.x + this.width && mX >= this.x && mY >= this.y && mY < this.y + this.height;
  }

  display(){
    if(checkHover(mouseX, mouseY)){
      fill(hoverColor);
    }
    else{
      fill(color)
    }
    rect(this.x, this.y, this.width, this.height);
  }


}
