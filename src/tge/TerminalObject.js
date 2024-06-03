import { Canvas } from "./canvas";
import { CollisionBox } from "./collision";
import { Vector2 } from "./vector2";

export class TerminalObject{
  /** @type {string[][]} */
  shape;
  /** @type {Vector2} */
  position;
  /** @type {Vector2} */
  anchor;
  /** @type {Canvas} */
  canvas;
  /** @type {CollisionBox} */
  anchor;
  constructor(shape,canvas,position=Vector2.zero,anchor=Vector2.zero,collision=0){
    this.shape = shape;
    this.canvas = canvas;
    this.position = position;
    this.anchor = anchor;
    const collisionArray = [];
    if(collision==0)for(let i=0;i<shape.length;i++){
      collisionArray[i] = [];
      for(let j=0;i<shape[i].length;j++){
        if(shape.length)collisionArray[i][j] = true;
        else collisionArray[i][j] = false;
      }
    }
    this.collision = new CollisionBox(collisionArray);
  }
  move(vector){

  }
}