export class Vector2{
  x;
  y;

  static zero = {
    x: 0,
    y: 0
  }
  sum(...vectors){
    let sumX=0;
    let sumY=0;
    for(const vector of vectors){
      sumX += vector.x;
      sumY += vector.y;
    }
    return {
      x: sumX,
      y: sumY
    }
  }
}