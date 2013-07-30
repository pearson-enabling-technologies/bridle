/* a reusable spider chart */
Bridle.spiderChart = function () {

  // define the chart
  var margin = 60,
    height = 250,
    width = 300,
    radius = (height-margin)/2,
    ticks = 4, // how many ticks on the grid?
      value = function(d) { return d[0]; },
      label = function(d) { return d[1]; },
      duration = 50,
      title = "spider chart",
      subtitle = "blah";
  // make some scales
  var scales = d3.scale.linear()
  var line = d3.svg.line()
    .x(function(d) { return d.x})
    .y(function(d) { return d.y});
    


  function chart (selection) {
    selection.each(function(data) {
      // calculate the radius
      radius = (Math.min(height,width) - margin) /2;

      maxX = d3.max(data, value) > 0 ? d3.max(data, value) : 1;
      // scale update
      scales.domain([0, maxX]).range([0,radius]);

      // calculate the positions
      data = data.map(function(d, i){
        return {
          x: calculateX(d, i, data.length),
          y: calculateY(d, i, data.length),
          val: value(d),
          label: label(d)
        }
      })

      //console.log(data, scales.domain())
      // select the svg element if it exists
      var svg = d3.select(this).selectAll("svg").data([data])

      // create the skeleton
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("text").attr("class", "title label");
      gEnter.append("text").attr("class", "subtitle label");
      gEnter.append("g").attr("class", "grid");
      gEnter.append("g").attr("class", "axes");
      gEnter.append("path").attr("class", "spider");

      // update the dimensions
      svg .attr("width", width)
      svg .attr("height", height)

      // update the inner dimensions
      var g = svg.select("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

      // the grid data, number of ticks
      var gridData = buildAxisGrid(data.length, ticks);

      // add the grid
      var gridEnter = g.select('.grid')
        .selectAll('.gridlevel')
        .data(gridData)
        .enter()
        .append("path").attr("class", "gridlevel")
        .style("stroke", "#000")
        .style("fill", "none")
        .style("opacity", 0.3)
        .attr("d", line);

      // add the axes
      var ax = g.select("g.axes").selectAll("g.axis")
        .data(data)
        
      var axEnter = ax.enter().append("g").attr("class", "axis");

      axEnter.append("svg:text")
        .style("text-anchor", function(d, i) {
            var x = Math.sin(angle(i, data.length)) * scales(scales.domain()[1]);
            if (Math.abs(x) < 0.1) {
              return "middle"
            }
            if (x > 0) {
              return "start"
            }

            return "end"
        })
        .attr("dy", function(d, i) {
            var y = Math.cos(angle(i, data.length)) * scales(scales.domain()[1]);
            if (Math.abs(y) < 0.1) {
              return ".72em"
            }
            if (y > 0) {
              return "1em"
            }
            return "-.3em"
        })
        .style("fill", "#333")
        .style("font-size", "9pt")
        .style("opacity", 0.6)
        .text(function(d){ return d.label})
        .attr("x", function(d, i) { return Math.sin(angle(i, data.length)) * scales(scales.domain()[1]);})
        .attr("y", function(d, i) { return Math.cos(angle(i, data.length)) * scales(scales.domain()[1]);});

      axEnter.append("svg:line")
         .style("stroke", "#000")
        .style("fill", "none")
        .style("opacity", 0.1)
        .attr("x1", function(d, i) { return Math.sin(angle(i, data.length)) * scales(scales.domain()[0]);})
        .attr("y1", function(d, i) { return Math.cos(angle(i, data.length)) * scales(scales.domain()[0]);})
        .attr("x2", function(d, i) { return Math.sin(angle(i, data.length)) * scales(scales.domain()[1]);})
        .attr("y2", function(d, i) { return Math.cos(angle(i, data.length)) * scales(scales.domain()[1]);})

      // update the title
      g.select('.title')
        .text(function(d) { return title; })
        .attr("y", -height/2)
        .attr("dy", "1.72em")
        .style("text-anchor", "middle");

      // update the subtitle
      g.select('.subtitle')
        .text(subtitle)
        .style("font-weight", "200")
        .style("font-size", "10px")
        .attr("dy", 40)
        .attr("y", -height/2)
        .style("text-anchor", "middle");


      // update the spider line
      g.select('.spider')
        .transition()
        .duration(duration)
        .style("fill", "#000")
        .style("opacity", 0.8)
        .attr("d", line);

    });
  }


  // compute an angle
  function angle(i, lenght) {
    return i * (2 * Math.PI / lenght) +
    Math.PI/lenght;
  }

  // x-caclulator
  // d is the datapoint, i is the index, length is the length of the data
  function calculateX(d, i, length) {
    var l = scales(value(d));
    return Math.sin(angle(i, length)) * l;
  }

  // y-calculator
  function calculateY(d, i, length) {
    var l = scales(value(d));
    return Math.cos(angle(i, length)) * l;
  }

  // * build the spider axis * //
  // rewrite this to conform to d3 axis style? //
  function buildAxisGrid(length, ticks) {
    var min = scales.domain()[0];
    var max = scales.domain()[1] > 0 ? scales.domain()[1] : 1;
    var increase = max/ticks;

    //console.log("building axis", length, ticks, min, max, increase)
    gridData = []
    for (var i = 0; i <= ticks; i++ ) {
      val = min + i*increase;
      var d = [val];
      gridPoints = [];
      for (var j = 0; j <= length; j++) {
        gridPoints.push({
          x: calculateX(d, j, length),
          y: calculateY(d, j, length),
        })
      };
      
      gridData.push(gridPoints)
    }

    return gridData;

  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return chart;
  };

  chart.label = function(_) {
    if (!arguments.length) return label;
    label = _;
    return chart;
  };

  chart.title = function(_) {
    if (!arguments.length) return title;
    title = _;
    return chart;
  };  

  chart.subtitle = function(_) {
    if (!arguments.length) return subtitle;
    subtitle = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  }


  return chart;

}