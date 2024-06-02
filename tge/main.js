import {Canvas} from "./canvas"

function main(){
  const screen = new Canvas(16,16);
  let aaa = 0;
    
  setInterval(()=>{
    screen.clear();
    screen.cellSet(aaa%16,aaa%16,"🔲");
    screen.render()
    aaa++;
  },1000)
}

main();