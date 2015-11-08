"use strict";
const $ = require('jquery');
const VehicleDrawer = require('./VehicleDrawer');

$(document).ready(() => {
(() => {
  console.log('ready freddy');
  let width = $(window).width();
  let height = $(window).height();
  let targetX = Math.round(Math.random()*width);
  let targetY = Math.round(Math.random()*height);
  const maxVel = 1000;
  const updateFreq = 100;

  const vehicle = new VehicleDrawer(width, height, maxVel, updateFreq);
  vehicle.drawVehicle(vehicle.car.pos);
})()
});
