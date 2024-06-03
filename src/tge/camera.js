import { Canvas } from "./canvas.js";

export class Camera extends TerminalObject{
    /**
     * 
     * @param {number} dx 
     * @param {number} dy 
     * @param {Canvas} canvas 
     */
    constructor(dx,dy,canvas){
        this.size={
            x: dx,
            y: dy
        }
        this.canvas=canvas;
    }
}