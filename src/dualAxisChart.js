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
  var xValue = function(d) {
    return new Date(d.z);
  };
  // we need two values
  var yLeftValue = function(d) {
    return d.v;
  };
  var yRightValue = function(d) {
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
      gEnter.append('g').attr("class", "lineSeries");
      gEnter.append('g').attr("class", "x axis");
      
      gEnter.append('g').attr("class", "y axis left").append("text")
        .attr('transform', "rotate(-90)")
        .attr('y', 6)
        .attr('dy', ".72em")
        .attr('class', "y axis left label")
        .attr('text-anchor', "middle");

      gEnter.append('g').attr("class", "y axis right").append("text")
        .attr('transform', "rotate(-90)")
        .attr('y', 6)
        .attr('dy', "1.72em")
        .attr('class', "y axis right label")
        .attr('text-anchor', "middle");

      gEnter.append('svg:text').attr('class', "chartTitle label")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("transform", "translate(" + (width - (margin.left + legendWidth )) / 2 + "," + (-margin.top) + ")");

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
        .transition()
        .duration(duration)
        .attr("y", function(d) {
          return height - yRight(d) - margin.top - margin.bottom;
        })
        .attr("height", yRight)
        .attr("fill-opacity", 1)

      // THE LINE
      var lineSeries = svg.select(".lineSeries")

      // line the path
      var linePath = lineSeries
        .append('path')
        .attr('class', 'line')
        .attr('stroke', colors(0))
        .attr('stroke-opacity', 0)
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .attr('d', function(d) {
          return line(d.values);
        })
        .transition()
        .duration(duration)
        .attr('stroke-opacity', 1)

      // circles for datapoints
      var gCircles = lineSeries
        .append('g')
        .attr("class", "circles")

      var circles = gCircles.selectAll('circle')
        .data(function(d) {
          return d.values;
        });

      var circlesEnter = circles.enter();

      circlesEnter.append('circle')
        .attr("opacity", 0)
        .attr('fill', colors(0))
        .attr("class", "seriesPoint")
        .attr("r", 0)
        .attr("cx", function(d) {
          return x(d) + xScale.rangeBand()/2
        })
        .attr("cy", yLeft)
        // TO DO ADD MOUSEOVER MOUSEOUT HANDLERS
        .transition()
        .duration(duration)
        .attr("opacity", 1)
        .attr("r", 3)

      circles.exit()
        .attr('fill-opacity', 0)
        .attr('r', 0)
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


  return chart;

}












