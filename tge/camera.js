import { Canvas } from "./canvas.js";

class Camera{
    size={};
    position={
        x: 0,
        y: 0
    };
    canvas;
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