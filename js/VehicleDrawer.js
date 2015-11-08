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
      draw.drawVehicle(draw.car)//draw.car.pos)
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
    this.vehicle = this.svgCanvas.selectAll("line").data(this.setData(data));
    this.vehicle.enter().append("line");
    this.vehicle.select("line");
    this.vehicle
          .attr("stroke", "pink")
          .attr("stroke-width", 1)
          .attr("x1", d => { return d.x1; })
          .attr("y1", d => { return d.y1; })
          .attr("x2", d => { return d.x2; })
          .attr("y2", d => { return d.y2; });

    this.vehicle
      .exit()
      .remove();
  }
};

module.exports = VehicleDrawer;
