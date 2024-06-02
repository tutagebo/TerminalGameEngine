import {Canvas} from "./canvas.js"

function main(){
  const screen = new Canvas(16,16,"   ");
  let aaa = 0;
    
  setInterval(()=>{
    screen.clear();
    screen.setCell(aaa%16,aaa%16," a ");
    screen.render()
    aaa++;
  },1000)
}

main();