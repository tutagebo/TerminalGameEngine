import * as readline from "readline";
import { TerminalObject } from "./TerminalObject.js";
import { Vector2 } from "./vector2.js";
import { array2DCopy } from "./utils.js";

const HalfSize = new RegExp(/^[\x20-\x7e]*$/);

export class Canvas{
  /** @type {string[][]} */
  canvas=[];
  size={};
  initElement="";
  cursor=0;
  /** @type {TerminalObject[]} */
  terminalObjects=[];

  static None = 0;

  constructor(dx,dy,element=""){
    this.size={
      x:dx,
      y:dy
    }
    this.initElement=element;
    this.cursor=(!HalfSize.test(element)+1)*this.initElement.length;
    for(let i=0;i<dx;i++){
      this.canvas.push([]);
      for(let j=0;j<dy;j++){
        this.canvas[i][j]=element;
      }
    }
  }
  render(){
    process.stdout.write('\x1B[?25l');  // カーソルを非表示にする
    readline.clearLine(process.stdout);
    const renderCanvas = array2DCopy(this.canvas);    //描画用の配列
    for(let object of this.terminalObjects){
      for(let i=0;i<object.shape.length;i++){
        for(let j=0;j<object.shape[i].length;j++){
          if(object.shape[i][j]=="")continue;
          const renderPos = Vector2.Sub(object.position, object.anchor);
          const torusX = (i+renderPos.x)%this.size.x;
          const torusY = (j+renderPos.y)%this.size.y;
          renderCanvas[torusX][torusY]=object.shape[i][j];
        }
      }
    }

    for(let i=0;i<this.size.y;i++){     //this.canvasの中身の描画
      for(let j=0;j<this.size.x;j++){
        readline.cursorTo(process.stdout,j*this.cursor,i);
        process.stdout.write(`${renderCanvas[j][i]}`);
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
      resultArray[px]=[];
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
  square(startX,startY,endX,endY,element=this.initElement){
    for(let i=startX;i<=endX;i++){
      for(let j=startY;j<=endY;j++)this.setCell(i,j,element);
    }
  }
  clone(startX,startY,endX,endY,targetX,targetY,mode=FillMode.normal){
    const targetRangeCells = this.getRangeCells(startX,startY,endX,endY);
    if(mode==1)this.square(startX,startY,endX,endY);
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
  /**
   * 
   * @param {TerminalObject} terminalObj 
   */
  joinTerminalObject(terminalObj){
    this.terminalObjects.push(terminalObj);
    return terminalObj;
  }
}

export class FillMode{
  static normal = 0;
  static move = 1;
}
