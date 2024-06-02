import * as readline from "readline";

const hankaku = new RegExp(/^[\x20-\x7e]*$/);

export class Canvas{
  canvas=[];
  size={};
  initElement="";
  cursor=0;
  constructor(dx,dy,element=""){
    this.size={
      x:dx,
      y:dy
    }
    this.initElement=element;
    this.cursor=(!hankaku.test(element)+1)*this.initElement.length;
    for(let i=0;i<dx;i++){
      this.canvas.push([]);
      for(let j=0;j<dy;j++){
        this.canvas[i][j]=element;
      }
    }
  }
  render(){
    readline.clearLine(process.stdout);
    for(let i=0;i<this.size.y;i++){
      for(let j=0;j<this.size.x;j++){
        readline.cursorTo(process.stdout,j*this.cursor,i);
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
  line(startX,startY,endX,endY,element=""){
    if(startX-endX==0){
      for(let y=startY;y<=endY;y++){
        this.setCell(startX,y,element);
      }
    }
    const a = (endY-startY)/(endX-startX);
    const b = startY-a*startX;
    let y = 0;
    for(let x=startX;x<=endX;x++){
      y = Math.round(a*x+b);
      this.setCell(x,y,element);
    }
  }
  square(startX,startY,endX,endY,element=""){
    for(let i=startX;i<=endX;i++){
      for(let j=startY;j<=endY;j++)this.setCell(i,j,element);
    }
  }
  clone(startX,startY,endX,endY,targetX,targetY){
    const targetRangeCells=this.getRangeCells(startX,startY,endX,endY);
    this.setRangeCells(targetX,targetY,targetRangeCells);
  }
  move(startX,startY,endX,endY,targetX,targetY){
    const targetRangeCells=this.getRangeCells(startX,startY,endX,endY);
    this.square(startX,startY,endX,endY);
    this.setRangeCells(targetX,targetY,targetRangeCells);
  }
  fillAll(element){
    for(let i=0;i<this.size.y;i++){
      for(let j=0;j<this.size.x;j++){
        this.setCell(i,j,element);
      }
    }
  }
  clear(){
    this.fillAll(this.initElement);
  }
}
