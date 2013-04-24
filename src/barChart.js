function barChart() {

  var margin = {top:50, bottom:30, left:100, right:100};
  var height = 400;
  var width  = 1000;
  var xValue = function(d) { return d.date };
  var yValue = function(d) { return d.y };
  var style  = 'stack';
  var offset = 'zero';
  var order  = 'default';
  var interpolate = 'linear';
  var yScale = d3.scale.linear();
  var colors = d3.scale.category10();

  var yAxis  = d3.svg.axis().scale(yScale).orient("left");
  var title  = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;



  function chart(selection) {
    selection.each(function(data) {


    // convert the data to an appropriate representation
    data = d3.layout.stack()
              .offset(offset)
              .order(order)
              .values(function(d) { return d.values})
              .x(xValue)
              .y(yValue)
              (data); // we pass the data as context

    var maxDates = data.map(function(d) {
      return d3.max(d.values, function(dt) {
        return new Date(dt.x)
      });
    });
    var minDates = data.map(function(d) {
      return d3.min(d.values, function(dt) {
        return new Date(dt.x)
      });
    });
    var maxDate = new Date(d3.max(maxDates).setDate(d3.max(maxDates).getDate() + 1));
    // console.log(d3.time.seconds(d3.min(minDates), d3.max(maxDates)))
    var xScale = d3.scale.ordinal()
      .domain(d3.time.days(d3.min(minDates), maxDate))
      .rangeRoundBands([0, width - margin.left - margin.right], 0.1);
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(d3.time.format.utc('%Y-%m-%d'))
      .tickSize(2)
      .tickPadding(6)
      .orient("bottom");

    yGroupMax = d3.max(data, function(layer) {
      return d3.max(layer.values, function(d) {
        return d.y;
      });
    }),
    yStackMax = d3.max(data, function(layer) {
      return d3.max(layer.values, function(d) {
        return d.y0 + d.y;
      });
    });
    numLayers = data.length;
    maxLayerLength = d3.max(data, function(layer) {
      return layer.values.length
    });

      yScale.domain([0, yStackMax])
            .range([height, 0]);

      var svg = d3.select("#bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var layer = svg.selectAll(".layer")
        .data(data)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) {
        return colors(i);
      });

      var rect = layer.selectAll("rect")
        .data(function(d) {
        return d.values;
      })
        .enter().append("rect")
        .attr("x", function(d) {
        return xScale(d.x);
      })
        .attr("y", height)
        .attr("width", xScale.rangeBand())
        .attr("height", 0);

      rect.transition()
        .delay(function(d, i) {
        return i * 10;
      })
        .attr("y", function(d) {
        return yScale(d.y0 + d.y);
      })
        .attr("height", function(d) {
        return yScale(d.y0) - yScale(d.y0 + d.y);
      });

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "rotate(-90)")        
        .transition()
        .duration(duration)
                .attr("transform", "translate(-25,0)")

        .call(yAxis)        

      d3.selectAll("input").on("change", change);

      // var timeout = setTimeout(function() {
      //   d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
      // }, 2000);

      function change() {
        // clearTimeout(timeout);
        if (this.value === "grouped") transitionGrouped();
        else transitionStacked();
      }

      function transitionGrouped() {
        yScale.domain([0, yGroupMax]);

        rect.transition()
          .duration(500)
          .delay(function(d, i) {
          return i * 10;
        })
          .attr("x", function(d, i, j) {
          return xScale(d.x) + xScale.rangeBand() / numLayers * j;
        })
          .attr("width", xScale.rangeBand() / numLayers)
          .transition()
          .attr("y", function(d) {
          return yScale(d.y);
        })
          .attr("height", function(d) {
          return height - yScale(d.y);
        });
      }

      function transitionStacked() {
        yScale.domain([0, yStackMax]);

        rect.transition()
          .duration(500)
          .delay(function(d, i) {
          return i * 10;
        })
          .attr("y", function(d) {
          return yScale(d.y0 + d.y);
        })
          .attr("height", function(d) {
          return yScale(d.y0) - yScale(d.y0 + d.y);
        })
          .transition()
          .attr("x", function(d) {
          return xScale(d.x);
        })
          .attr("width", xScale.rangeBand());
      }


    })
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