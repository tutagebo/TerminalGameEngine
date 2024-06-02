const readline = require("readline");

class Canvas{
  canvas=[];
  size={};
  constructor(dx,dy){
    this.size={
      x:dx,
      y:dy
    }
    for(let i=0;i<dx;i++){
      this.canvas.push([]);
      for(let j=0;j<dy;j++){
        this.canvas[i][j]="　";
      }
    }
  }
  render(){
    readline.clearLine(process.stdout);
    for(let i=0;i<this.size.y;i++){
      for(let j=0;j<this.size.x;j++){
        readline.cursorTo(process.stdout,j*2,i);
        process.stdout.write(`${this.canvas[i][j]}`);
      }
    }
  }
  setCell(x,y,element){
    this.canvas[x][y] = element;
  }
  getCell(x,y){
    return this.canvas[x][y];
  }
  /**
   * 
   * @param {number} startX 
   * @param {number} startY 
   * @param {any[][]} eleArray 
   */
  setRangeCells(startX,startY,eleArray){
    let i=0,j=0;
    for(let x=startX;x<startX+eleArray.length;x++){
      j=0;
      for(let y=startY;y<startY+eleArray[i].length;y++){
        if(eleArray[i][j]=="")continue;
        this.canvas[x][y]=eleArray[i][j];
        j++;
      }
      i++
    }
  }
  /**
   * 
   * @param {number} startX 
   * @param {number} startY 
   * @param {number} endX 
   * @param {number} endY 
   * @returns {string[][]}
   */
  getRangeCells(startX,startY,endX,endY){
    let px=0,py=0;
    let resultArray=[];
    for(let i=startX;i<=endX;i++){
      resultArray[i]=[];
      for(let j=startY;j<=endY;j++){
        resultArray[px][py]=this.getCell(i,j);
        py++;
      }
      px++;
    }
    return resultArray;
  }
  line(x1,y1,x2,y2,element="🔲"){
    if(x1-x2==0){
      for(let y=y1;y<=y2;y++){
        this.setCell(x1,y,element);
      }
    }
    const a = (y2-y1)/(x2-x1);
    const b = y1-a*x1;
    let y = 0;
    for(let x=x1;x<=x2;x++){
      y = Math.round(a*x+b);
      this.setCell(x,y,element);
    }
  }
  clear(){
    for(let i=0;i<this.size.y;i++){
      for(let j=0;j<this.size.x;j++){
        this.setCell(i,j,"　");
      }
    }
  }
  square(x1,y1,x2,y2,element="　"){
    for(let i=x1;i<=x2;i++){
      for(let j=y1;j<=y2;j++)this.setCell(i,j,element);
    }
  }
  clone(x1,y1,x2,y2,x3,y3){
    const targetRangeCells=this.getRangeCells(x1,y1,x2,y2);
    this.setRangeCells(x3,y3,targetRangeCells);
  }
  move(x1,y1,x2,y2,x3,y3){
    const targetRangeCells=this.getRangeCells(x1,y1,x2,y2);
    this.square(x1,y1,x2,y2);
    this.setRangeCells(x3,y3,targetRangeCells);
  }
}


const screen = new Canvas(16,16);
let aaa = 0;

setInterval(()=>{
  screen.clear();
  screen.cellSet(aaa%16,aaa%16,"🔲");
  screen.render()
  aaa++;
},1000)

