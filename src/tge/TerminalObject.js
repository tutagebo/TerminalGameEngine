import { Canvas } from "./canvas.js";
import { CollisionBox } from "./collision.js";
import { Vector2 } from "./vector2.js";

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
  /**
   * 
   * @param {string[][]} shape 
   * @param {Canvas} canvas 
   * @param {Vector2} position 
   * @param {Vector2} anchor 
   * @param {CollisionBox} collision 
   */
  constructor(shape,position=Vector2.Zero,anchor=Vector2.Zero,collision=0){
    this.shape = shape;
    this.canvas = Canvas.None;
    this.position = position;
    this.anchor = anchor;
    const collisionArray = [];
    if(collision==0)for(let i=0;i<shape.length;i++){
      collisionArray[i] = [];
      for(let j=0;j<shape[i].length;j++){
        if(shape[i][j]!="")collisionArray[i][j] = true;
        else collisionArray[i][j] = false;
      }
    }
    this.collision = new CollisionBox(collisionArray);
  }
  /**
   * @param {Vector2} vector 
   */
  move(vector){
    this.position.add(vector);
    return this;
  }
}