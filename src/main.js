import { TerminalObject } from "./tge/TerminalObject.js";
import {Canvas, FillMode} from "./tge/canvas.js"
import { Vector2 } from "./tge/vector2.js";

function main(){
  const screen = new Canvas(16,16,"   ");
  let a = 0;
  let shape = [
    [   "","aaa",   ""],
    ["aaa","aaa","aaa"],
    [   "","aaa",   ""]
  ];
  const terminalObject = new TerminalObject(shape,new Vector2(0,0));
  screen.joinTerminalObject(terminalObject);
  setInterval(()=>{
    //screen.clear();
    terminalObject.move(new Vector2(1,2))
    screen.render()
    //console.log(screen.terminalObjects);
    a++;
  },100)
}

main();