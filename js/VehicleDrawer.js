"use strict";
const d3 = require('d3');
const Vehicle = require('./vehicle');

class VehicleDrawer {
  constructor(width, height, maxVel, updateFreq) {
    const draw = this;
    this.height = height;
    this.width = width;
    this.car = new Vehicle(width, height, maxVel, updateFreq);
    this.svgCanvas = this.makeCanvas(width, height);
    this.appendRect(width, height);
    this.interval = setInterval(() => {
      draw.car.updateVehicleState(draw.height, draw.width);
      draw.drawVehicle(draw.car.pos)
    }, 1000/updateFreq);
  }

  makeCanvas(width, height) {
   return d3.select("body").append("svg")
                            .attr("width", width)
                            .attr("height", height);
  }
  appendRect(width, height) {
    const draw = this;
    this.svgCanvas.append("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "white")
          .style("pointer-events", "all")
          .on("mousemove", function() {
                const rect = this;
                let mouse = d3.mouse(rect);
                draw.car.updateTargetState(mouse[0], mouse[1]);
            });
  }

  setData(data) {
    if (!(data instanceof Array)) {
      return [data];
    }
    return data;
  }

  drawVehicle(data) {
    this.vehicle = this.svgCanvas.selectAll("circle").data(this.setData(data));
    this.vehicle.enter().append("circle");
    this.vehicle.select("circle");
    this.vehicle
          .style("fill", "pink")
          .attr("cx", d => { return d.x;})
          .attr("cy", d => { return d.y;})
          .attr("r", 5);

    this.vehicle
      .exit()
      .remove();
  }
};

module.exports = VehicleDrawer;
