import {Canvas, FillMode} from "./tge/canvas.js"

function main(){
  const screen = new Canvas(16,16,"   ");
  let a = 0;
  screen.setCell(0,0," a ");
    
  setInterval(()=>{
    screen.clone(a%16,a%16,a%16,a%16,(a+1)%16,(a+1)%16,FillMode.move);
    screen.render()
    a++;
  },100)
}

main();