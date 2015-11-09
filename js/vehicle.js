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
    this.maxVel = maxVel;
    this.targetX = this.x1;
    this.targetY = this.y1;
  }

  updateTargetState( x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  getCarSlope(pos) {
    let slope = (pos.y1 - pos.y2)/(pos.x1 - pos.x2);
    if ( isNaN(slope)) {
      return 0;
    }
    return slope;
  }

  getAlignment(pos) {
    let alignment = (pos.y1 - pos.targetY)/(pos.x1 - pos.targetX);
    if ( isNaN(alignment)) {
      return 0;
    }
    return alignment;
  }

  updatedAlignment(carSlope, alignment) {
    return (carSlope + alignment)/2;
  }

  setTailPos(newAlignment, pos) {
    // newAlignment = O/A, want hyp to be CAR_LENGTH
    let radians = Math.atan(newAlignment);
    let adjacent = Math.cos(radians)*CAR_LENGTH;
    let opposite = Math.sin(radians)*CAR_LENGTH;
    this.x2 = this.x1 - adjacent;
    this.y2 = this.y1 - opposite;
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
    this.setTailVal(this);
  }

  setTailVal(vehicle) {
   //gets hypotenuse of mini triangle, gets
   //number of times it goes into car length,
   //then subtracts the respective sides by that constanct
//   this.x2 += dx;
 //  this.y2 += dy;
    let carSlope = this.getCarSlope(this);
    let alignment = this.getAlignment(this);
    let newAlignment = this.updatedAlignment(carSlope, alignment);
    this.setTailPos(newAlignment, this);
  }
}

module.exports = Vehicle;
