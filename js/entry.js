"use strict";
const $ = require('jquery');
const VehicleDrawer = require('./VehicleDrawer');

$(document).ready(() => {
(() => {
  console.log('ready freddy');
  let width = $(window).width();
  let height = $(window).height();
  const maxVel = 100;
  const updateFreq = 100;

  const vehicle = new VehicleDrawer(width, height, maxVel, updateFreq);
  vehicle.drawVehicle(vehicle.car.pos);
})()
});
