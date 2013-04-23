function lineChart() {

  // define dimensions of graph
  var margin = { top: 50, bottom: 30, left: 100, right: 100 };
  var height = 400;
  var width = 1000;
  var xValue = function(d) { return d.date };
  var yValue = function(d) { return d.y };
  var title = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;
  var xScale = d3.time.scale.utc().nice();
  var yScale = d3.scale.linear().nice();
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  xAxis.tickSize( - height + margin.top + margin.bottom, 0); // get/set?
  xAxis.tickSubdivide(true); // get/set?
  var yAxis = d3.svg.axis().scale(yScale).orient("left");
  var colors = d3.scale.category10();
  function getDate(d) {
    console.log(d)
    var dt = new Date(d.date);
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }


  function chart(selection) {
    selection.each(function(data) {



      // get max and min date(s)
      var maxDates = data.map(function(d) {
        return d3.max(d.values, function(dt) {
          return dt.x
        });
      });
      var minDates = data.map(function(d) {
        return d3.min(d.values, function(dt) {
          return dt.x
        });
      });


      xScale.domain([d3.min(minDates), d3.max(maxDates)])
            .range([0, width - margin.left - margin.right]);


      // X scale will fit all values from data[] within pixels 0-w
      //var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
      // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
      
      // find out the y max
      var maxYs = data.map(function(d) {
        return d3.max(d.values, function(val) {
          return val.y;
        })
      })

      yScale.domain([0, d3.max(maxYs)])
      .range([height - margin.top - margin.bottom, 0]);

      // create a line function that can convert data[] into x and y points
      var line = d3.svg.line()
        // assign the X function to plot our line as we wish
        .x(function(d, i) {
          // return the X coordinate where we want to plot this datapoint
          return xScale(d.x); //x(i);
        })
          .y(function(d) {
          // return the Y coordinate where we want to plot this datapoint
          return yScale(d.y);
        });


      function xx(e) {
        return xScale(getDate(e));
      };

      function yy(e) {
        return yScale(e.y);
      };




      // set up the scaffolding
      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "lines");
      gEnter.append("g").attr("class", "points");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis").append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".72em")
        .attr("class", "y axis label")
        .attr("text-anchor", "middle");
      gEnter.append("svg:text").attr("class", "chartTitle label")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("transform", "translate(" + (width - margin.left - margin.right + 20) / 2 + "," + (-margin.top) + ")");
      gEnter.append("g")
        .attr("class","legend")
        .attr("transform","translate(" + (width - margin.left - margin.right + 20) + "," + margin.top + ")")
        .style("font-size","12px");

      // update the outer dimensions
      svg 
        .attr("width", width)
        .attr("height", height)

      // update the inner dimensions
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // reasign the data to trigger addition/deletion
      var gLine = g.select('.lines').selectAll('.line')
          .data(function(d) { return d });

      var gLineEnter = gLine.enter();
      // add paths
      gLineEnter.append("path")
        .attr("data-legend",function(d) { return d.name})
        .attr("class", "line");

      gLine.exit()
        .remove();

      // reasign the data to trigger points
      var gPoints = g.select('.points').selectAll('g.seriespoints')
          .data(function(d) { return d });

      gPoints.exit()
        .remove();

      var gPointsEnter = gPoints.enter();





      // update entering points
      var gCircles = gPointsEnter.append("g").attr("class", "seriespoints")
          .selectAll('g.circle')
          .data(function(d) { 
            d.values.forEach(function(v) {v.name = d.name}); return d.values})      

      // update chilling points
      gPoints.selectAll('g.circle')
          .data(function(d) { 
            d.values.forEach(function(v) {v.name = d.name}); return d.values})

      var circlesEnter = gCircles.enter().append("g").attr("class", "circle");

      circlesEnter.append('circle')
        .attr("opacity", 0.1)
        .attr("class", "seriespoint")
        .attr('r', 0)
        .attr('cx', function (d) {
          return xScale(d.x)
        })
        .attr('cy', function (d) {
          return yScale(d.y)
        });

      // update the areas
      g.selectAll('path.line')
          .attr("stroke", function(d,i) {
            return colors(i);
          })
          .attr("fill", "none")
          .transition()
          .duration(duration/2)
          .attr("d", function(d) {
            return line(d.values);
          })
          .attr("stroke-width", 1.5);
      
      // update the circles
      g.selectAll('g.circle')
          .select('circle')
          .transition()
          .duration(duration)
          .attr('r', 5)

       // update the title
      g.select("text.chartTitle")
        .text(title)

      // update the x-axis
      g.select(".x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis);

      // update the y-axis
      g.select(".y.axis")
        //.attr("transform", "translate(")
        .transition()
        .duration(duration)
        .attr("transform", "translate(-25,0)")

        .call(yAxis)
        
      g.select(".y.axis.label")
        .attr("y", -45)
        .attr("x", (- height + margin.top + margin.bottom) / 2)
        .attr("dy", ".1em")
        // .attr("transform", "rotate(-90)")
        .text(yAxisTitle);

      // update the legend
      g.select(".legend")
        .call(d3.legend)

      // add tooltips
      g.selectAll('g.circle')
        .tooltip(function(d, i) {
          var format = d3.format(',f');
          var tformat = d3.time.format.utc('%Y-%m-%d')
          var r, svg;
          r = +d3.select(this).attr('r');
          svg = d3.select(document.createElement("svg")).attr("height", 50);
          g = svg.append("g");
          g.append("rect").attr("width", r * 10).attr("height", 10);
          g.append("text").text("10 times the radius of the circle").attr("dy", "25");
          return {
            type: "tooltip",
            text: tformat(d.x) + " -  " + d.name + ": " + format(d.y),
            detection: "shape",
            placement: "fixed",
            gravity: "top",
            position: [X(d), Y1(d)],
            displacement: [0, -10],
            mousemove: false
          };
        });

    });


  }


  // x accessor

  function X(d) {
    return xScale(d.x);
  }

  // y-0 accessor

  function Y0(d) {
    return yScale(d.y0);
  }

  // y-1 accessor

  function Y1(d) {
    return yScale(d.y0 + d.y);
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

  chart.xAxis = function(_) {
    if (!arguments.length) return xAxis;
    xAxis = _;
    return chart;
  }

  chart.yAxis = function(_) {
    if (!arguments.length) return yAxis;
    yAxis = _;
    return chart;
  }

  chart.yAxisTitle = function(_) {
    if (!arguments.length) return yAxisTitle;
    yAxisTitle = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  }

  return chart;
}