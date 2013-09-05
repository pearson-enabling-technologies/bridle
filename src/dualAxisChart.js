/*
# Dual Axis Chart

There could be many combinations that we might want to create with a 
dual axis chart, namely:

1. left axis 
  a. Bar Chart
  b. Line Chart
2. right axis
  a. Bar Chart
  b. Line Chart

There is a case here for modularising the bar, line and stack generators,
but for the moment we can just try to suport the above choices, by exposing
`chart.leftChart` and `chart.rightChart` and being able to set `bar` or `line`.

so when we define the chart, we can just say:
```js
  chart.dualAxisChart()
    .leftChart('bar')
    .rightChart('line')
    // etc...
```

I guess if you have a better idea for this, go ahead an implement it.

Dario.

*/

var Bridle = Bridle || {};

// dual axis chart
Bridle.DualAxisChart = function () {

  // sizing
  var margin = {
      top: 50,
      bottom: 70,
      left: 100,
      right: 150
    };
  var height = 400;
  var width = 800;

  // accessors
  var xValue = function (d) {
    return new Date(d.z);
  };
  // we need two values
  var yLeftValue = function (d) {
    return d.v;
  };
  var yRightValue = function (d) {
    return d.w;
  };

  // misc
  var offset = 'zero';
  var order = 'default';
  var duration = 1000;

  // scales
  // left is for the line
  var yLeftScale = d3.scale.linear();
  // right is for the rects
  var yRightScale = d3.scale.linear();

  var xScale = d3.scale.ordinal();

  var colors = d3.scale.category10();

  // Axes
  var yLeftAxis = d3.svg.axis()
    .scale(yLeftScale)
    .orient('left')
  var yRightAxis = d3.svg.axis()
    .scale(yRightScale)
    .orient('right')

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')

  var tickFormat = d3.time.format("%Y-%m-%d");
  var xAxisFontSize = 10; // do we really want this here?
  var yAxisFontSize = 10;
  

  // formatter for tooltip
  var formatterX = d3.time.format("%Y-%m-%d");
  var formatterLeftY = d3.format(".02f");
  var formatterRightY = d3.format(".02f");

  // titles
  var title = 'Chart Title';
  var yLeftAxisTitle = 'Left Axis Title';
  var yRightAxisTitle = 'Right Axis Title';


  // line generator
  var line = d3.svg.line()
    .x(function(d, i) {
      return x(d) + xScale.rangeBand()/2;
    })
    .y(function(d) {
      return yLeft(d);
    });

  // legend
  var legend = Bridle.LegendBox().nameAccessor(function(d) {
    return (d);
  });

  // event dispatch
  var dispatch = d3.dispatch('showTooltip', 'hideTooltip', "pointMouseover", "pointMouseout");

  // the chart function proper
  function chart(selection) {
    selection.each(function(data) {
      var container = this;


      // sort the data points in each layer
      data.values.sort(sortByDateDesc);


      var legendWidth = legend.width();
      legend.height(height)

      // sort out the x scale
      xScale
        .domain(data.values.map(function(d) {
          return xValue(d);
        }))
        .rangeRoundBands([0, width - (margin.right + legendWidth + margin.left)], 0.1);

      xAxis.tickFormat(tickFormat)
        // .tickValues(xScale.domain().filter(function(d, i) {
        //   var nthLabel = Math.ceil(200 / (width / avgDataPoints()));
        //   // //console.log(nthLabel)
        //   return !(i % nthLabel);
        // }))


      // sort out the y scales
      yLeftScale
        .range([height - margin.top - margin.bottom, 0])
        .domain([
          0, 
          d3.max(data.values, function(d) {
            return yLeftValue(d);
          })
        ]);
      
      yRightScale
        .range([height - margin.top - margin.bottom, 0])
        .domain([
          0, 
          d3.max(data.values, function(d) {
            return yRightValue(d);
          })
        ]);


      // set up the scaffolding
      var svg = d3.select(this).selectAll("svg").data([data])
      var gEnter = svg.enter().append('svg').attr("class", "bridle").append("g");

      gEnter.append('g').attr("class", "barSeries");
      gEnter.append('g').attr("class", "lineSeries")
            .append('g').attr("class", "circles");

      gEnter.append('g').attr("class", "x axis");
      
      gEnter.append('g').attr("class", "y axis left")
        .append("text")
        .attr('transform', "rotate(-90)")
        .attr('y', 6)
        .attr('dy', ".72em")
        .attr('class', "y axis left label")
        .attr('text-anchor', "middle");

      gEnter.append('g').attr("class", "y axis right")
        .append("text")
        .attr('transform', "rotate(-90)")
        .attr('y', 6)
        .attr('dy', "1.72em")
        .attr('class', "y axis right label")
        .attr('text-anchor', "middle");

      gEnter.append('svg:text').attr('class', "chartTitle label")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("transform", "translate(" + (width - (margin.left + legendWidth + margin.left)) / 2 + "," + (-margin.top) + ")");

      gEnter.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - (margin.right + legendWidth) + 20) + "," + 0 + ")")
        .style("font-size", "12px");


      // outer dimensions
      svg
        .attr('width', width)
        .attr('height', height);

      // inner dimensions
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      // THE BARS
      var barSeries = svg.select(".barSeries")

      var rects = barSeries.selectAll('rect')
        .data(function(d) {
          return d.values
        })

      rects.enter().append('rect')
        .attr("class", 'bar')
        .attr("fill", colors(1))
        .attr("fill-opacity", 0)
        .attr("x", x)
        .attr("y", height - margin.top - margin.bottom)
        .attr("height", 0)
        .attr("width", xScale.rangeBand())
        .on('mouseover', mouseOverHandler)
        .on('mouseout', mouseOutHandler)


      barSeries.selectAll('rect')
        .transition()
        .duration(duration)
        .attr("height", function(d) {
          return height - yRight(d) - margin.top - margin.bottom;
        })
        .attr("y", yRight)
        .attr("fill-opacity", 1)


      // THE LINE
      var lineSeries = svg.select(".lineSeries")

      var linePath = lineSeries
        .selectAll('path.line')
        .data(function(d) {
          return [d]
        })


      linePath.enter()
        .append('path')
        .attr('class', 'line')
        .attr('stroke', colors(0))
        .attr('stroke-opacity', 0)
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .transition()
        .duration(duration)
        .attr('stroke-opacity', 1)

      linePath.exit()
        .remove();

      lineSeries.select('path')
        .attr('d', function(d) {
          return line(d.values);
        })


      // circles for datapoints
      var circles = lineSeries.select('g.circles').selectAll('circle')
        .data(function(d) {
          return d.values;
        });



      var circlesEnter = circles.enter();

      var containerElement = this;

      circlesEnter.append('circle')
        .attr("opacity", 0)
        .attr('fill', colors(0))
        .attr("class", "seriesPoint")
        .attr("r", 0)

      circles
        .attr("cx", function(d) {
          return x(d) + xScale.rangeBand()/2
        })
        .attr("cy", yLeft)
        .on('mouseover', mouseOverHandler)
        .on('mouseout', mouseOutHandler)
        .transition()
        .duration(duration)
        .attr("opacity", 1)
        .attr("r", 3)

      circles.exit()
        .remove();


      // update the title
      g.select("text.chartTitle")
        .text(title)


      // update the x-axis
      g.select(".x.axis")
        .attr("transform", "translate(0," + yLeftScale.range()[0] + ")")
        .call(xAxis)
        .selectAll("text") 
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
          return "rotate(-65)" 
        });

      // update the y-axis
      g.select(".y.axis.left")
      .attr("transform", "translate(-25,0)")
      .attr("opacity", 0)
      .transition()
      .duration(duration)
      .attr("opacity", 1)
      .call(yLeftAxis)
      .selectAll('text')
      .attr('fill', colors(0))

      // update the y-axis
      g.select(".y.axis.right")
      .attr("opacity", 0)
      .attr("transform", "translate(" + (width - (legendWidth + margin.right + margin.left) + 25)  + ",0)")
      .transition()
      .duration(duration)
      .attr("opacity", 1)
      .call(yRightAxis)
      .selectAll('text')
      .attr('fill', colors(1))

      g.select(".y.axis.left.label")
        .attr("y", -45)
        .attr("x", (-height + margin.top + margin.bottom) / 2)
        .attr("dy", ".1em")
        .text(yLeftAxisTitle);

      g.select(".y.axis.right.label")
        .attr("y", +55)
        .attr("x", (-height + margin.top + margin.bottom) / 2)
        .attr("dy", ".1em")
        .text(yRightAxisTitle);


      // update the legend
      g.select('.legend')
        .datum(data.measures)
        .call(legend);

      dispatch.on('pointMouseover.tooltip', function(e) {
        var left = e.pos[0];
        var top = e.pos[1];

        var content = '<h3>' + formatterX(e.x) + '</h3><div class="rightValue">' +
          '<div class="rightLabel">' + data.measures[0] + ':</div>' +
          '<div class="rightVal">' + formatterRightY(e.yRight) + '</div>' +
          '</div><div class="leftValue">' +
          '<div class="leftLabel">' + data.measures[1] + ':</div>' +
          '<div class="leftVal">' + formatterLeftY(e.yLeft) + '</div>' +
          '</div>';

        Bridle.tooltip.show([left, top], content);
      });

      dispatch.on('pointMouseout.tooltip', function(e) {
        Bridle.tooltip.cleanup();
      });

    });
  }

  // showTooltip mouseOver handler
  function mouseOverHandler(d, i, j) {
    var pos = d3.mouse(document.body)
    dispatch.pointMouseover({
      x: xValue(d),
      pos: pos,
      yLeft: yLeftValue(d),
      yRight: yRightValue(d),
      series: d.name,
      pointIndex: i,
      seriesIndex: j
    });
  }

  function mouseOutHandler(d, i, j) {
    dispatch.pointMouseout({
      // point: d,
      // series: data[d.series],
      // pointIndex: d.point,
      // seriesIndex: d.series
    });
  }

  // utility functions
  function toDate(e) {
    return new Date(e);
  }

  var sortByDateDesc = function(a, b) {
    return toDate(xValue(a)) > toDate(xValue(b)) ? 1 : -1;
  };
 
  var sortByDateAsc = function(a, b) {
    return toDate(xValue(b)) < toDate(xValue(a)) ? 1 : -1;
  };

  function x(d) {
    return xScale(xValue(d));
  };

  function yLeft(d) {
    return yLeftScale(yLeftValue(d));
  };

  function yRight(d) {
    return yRightScale(yRightValue(d));
  };

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

  chart.xScale = function(_) {
    if (!arguments.length) return xScale;
    xScale = _;
    return chart;
  };

  chart.yLeftScale = function(_) {
    if (!arguments.length) return yLeftScale;
    yLeftScale = _;
    return chart;
  };

  chart.yRightScale = function(_) {
    if (!arguments.length) return yRightScale;
    yRightScale = _;
    return chart;
  };

  chart.xAxis = function(_) {
    if (!arguments.length) return xAxis;
    xAxis = _;
    return chart;
  };

  chart.yAxis = function(_) {
    if (!arguments.length) return yAxis;
    yAxis = _;
    return chart;
  };

  chart.yLeftAxisTitle = function(_) {
    if (!arguments.length) return yLeftAxisTitle;
    yLeftAxisTitle = _;
    return chart;
  };

  chart.yRightAxisTitle = function(_) {
    if (!arguments.length) return yRightAxisTitle;
    yRightAxisTitle = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  }

  chart.legend = function(_) {
    if (!arguments.length) return legend;
    legend = _;
    return chart;
  }

  chart.xValue = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  }

  chart.yLeftValue = function(_) {
    if (!arguments.length) return yLeftValue;
    yLeftValue = _;
    return chart;
  }

  chart.yRightValue = function(_) {
    if (!arguments.length) return yRightValue;
    yRightValue = _;
    return chart;
  }

  chart.formatterX = function(_) {
    if (!arguments.length) return formatterX;
    formatterX = _;
    return chart;
  }

  chart.formatterY = function(_) {
    if (!arguments.length) return formatterY;
    formatterY = _;
    return chart;
  }

  chart.nameValue = function(_) {
    if (!arguments.length) return nameValue;
    nameValue = _;
    return chart;
  }

  chart.colors = function(_) {
    if (!arguments.length) return colors;
    colors = _;
    return chart;
  };


  return chart;

}













