"use strict";
//vehicle chases mouse
//vehicle's velocity is proportional
//in x and y direction to distance from
//mouse
//thrust is force that moves the vehical along it's path
//steer is force tangential to the path
const CAR_LENGTH = 20;

class Vehicle {
  constructor(width, height, maxVel, updateFreq) {
    this.x1 = Math.round(Math.random()*width);
    this.y1 = Math.round(Math.random()*height);
    this.x2 = this.x1 + CAR_LENGTH;
    this.y2 = this.y1;
    this.steer = 0;
    this.thrust = 0;
    this.maxUpdateVel = maxVel/updateFreq; //max number of px covered per update
    this.targetX = this.x1;
    this.targetY = this.y1;
  }

  updateTargetState( x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  updateVehicleState(height, width) {
    this.steer = this.targetX - this.x1;
    this.thrust = this.targetY - this.y1;
    let xConst = this.steer/width;
    let yConst = this.thrust/height; //will be used to adjust speed to be fraction of max speed
    let dx = xConst*this.maxUpdateVel;
    let dy = yConst*this.maxUpdateVel;
    this.x1 += dx;
    this.y1 += dy
    this.setTailVal(this.x1, this.y1, dx, dy);
  }

  setTailVal(x1, y1, dx, dy) {
   //gets hypotenuse of mini triangle, gets
   //number of times it goes into car length,
   //then subtracts the respective sides by that constanct
   let miniHyp = Math.sqrt((Math.pow(dx, 2) + Math.pow(dy, 2)));
   let K = CAR_LENGTH/miniHyp;
   this.x2 -= dx;
   this.y2 -= dy;
  }
}

module.exports = Vehicle;
