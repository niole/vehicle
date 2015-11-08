"use strict";
//vehicle chases mouse
//vehicle's velocity is proportional
//in x and y direction to distance from
//mouse
//thrust is force that moves the vehical along it's path
//steer is force tangential to the path

class Vehicle {
  constructor(width, height, maxVel, updateFreq, targetX, targetY) {
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
     this.maxUpdateVel = maxVel/updateFreq; //max number of px covered per update
     this.targetX = targetX;
     this.targetY = targetY;
     this.width = width;
     this.height = height;
  }

  updateTargetState( x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  updateVehicleState() {
    let forceX = this.targetX - this.pos.x;
    let forceY = this.targetY - this.pos.y;
    let xConst = forceX/this.width;
    let yConst = forceY/this.height; //will be used to adjust speed to be fraction of max speed
    this.pos.x += xConst*this.maxUpdateVel;
    this.pos.y += yConst*this.maxUpdateVel;
  }
}

module.exports = Vehicle;
