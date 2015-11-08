//vehicle chases mouse
//vehicle's velocity is proportional
//in x and y direction to distance from
//mouse
//thrust is force that moves the vehical along it's path
//steer is force tangential to the path

class Vehicle {
  constructor(width, height, maxVel, updateFreq) {
    this.pos =
      {x: Math.round(Math.random()*width),
        y: Math.round(Math.random()*height)};
    this.orient = Math.round(Math.random()*360);
    this.steer =
      {x: Math.random()*5,
        y: Math.random()*5};
     this.thrust =
       {x: Math.random()*5,
         y: Math.random()*5};
     this.maxVel = maxVel;//100 px per second
     this.updateFreq = updateFreq; //number of milliseconds per update
     this.maxUpdateVel = this.maxVel/this.updateFreq; //max number of px covered per update
  }

  updateVehicleState(mouseX, mouseY, width, height) {
    //state updates every 100th of a second
    //on a 10 millisecond timeout
    let [forceX , forceY] = [mouseX - this.pos.x, mouseY - this.pos.y];
    let [xConst, yConst] = [forceX/width, forceY/height]; //will be used to adjust speed to be fraction of max speed
    this.pos.x += xConst*this.maxUpdateVel;
    this.pos.y += yConst*this.maxUpdateVel;
  }
}
