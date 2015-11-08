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
    let forceX = this.targetX - this.x1;
    let forceY = this.targetY - this.y1;
    let xConst = forceX/width;
    let yConst = forceY/height; //will be used to adjust speed to be fraction of max speed
    this.x1 += xConst*this.maxUpdateVel;
    this.y1 += yConst*this.maxUpdateVel;
    this.x2 -= xConst*this.maxUpdateVel;
    this.y2 -= yConst*this.maxUpdateVel;

  }
}

module.exports = Vehicle;
