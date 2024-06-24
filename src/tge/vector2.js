export class Vector2{
  /** @param */
  x;
  y;

  constructor(x=0,y=0){
    this.x = x;
    this.y = y;
    return this;
  }

  static Zero = new Vector2(0,0);
  static Sum(...vectors){
    let resVector = new Vector2();
    for(const vector of vectors){
      resVector.x += vector.x;
      resVector.y += vector.y;
    }
    return resVector;
  }

  /**
   * 
   * @param {Vector2} v1 
   * @param {Vector2} v2 
   * @returns 
   */
  static Sub(v1,v2){
    return new Vector2(v1.x-v2.x,v1.y-v2.y);
  }
  /**
   * 
   * @param {Vector2} v1 
   * @param {Vector2} v2 
   * @returns {number}
   */
  static Dot(v1,v2){
    return v1.x*v2.x+v1.y*v2.y;
  }

  /**
   * @param {Vector2} vector 
   * @returns {Vector2}
   */
  add(vector){
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  /**
   * @param {Vector2} vector 
   * @returns {Vector2}
   */
  sub(vector){
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  dot(vector){
    return Vector2.Dot(this,vector);
  }

  length(){
    return Math.sqrt(this.x**2+this.y**2);
  }
}