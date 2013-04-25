function barChart() {

  var margin = {
    top: 50,
    bottom: 30,
    left: 100,
    right: 100
  };
  var height = 400;
  var width = 1000;
  var xValue = function(d) {
    return d.date
  };
  var yValue = function(d) {
    return d.y
  };
  var style = 'stack';
  var offset = 'zero';
  var order = 'default';
  var interpolate = 'linear';
  var yScale = d3.scale.linear();
  var colors = d3.scale.category10();

  var yAxis = d3.svg.axis().scale(yScale).orient("left");
  var title = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;

  var xScale = d3.scale.ordinal()
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(d3.time.format.utc('%Y-%m-%d'))
    .tickSize(2)
    .tickPadding(6)
    .orient("bottom");


  function chart(selection) {
    selection.each(function(data) {


      // convert the data to an appropriate representation
      data = d3.layout.stack()
        .offset(offset)
        .order(order)
        .values(function(d) {
        return d.values
      })
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

      xScale.domain(d3.time.days(d3.min(minDates), maxDate))
        .rangeRoundBands([0, width - margin.left - margin.right], 0.1);



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
        .range([height - margin.top - margin.bottom, 0]);





      // set up the scaffolding
      // note: enter only fires if data is empty
      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "rects");
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

      // reasign the data to trigger points
      var gLayer = g.select('.rects').selectAll('g.layerrects')
          .data(function(d) { 
            return d })

      gLayer.exit()
        .remove();

      var gLayerEnter = gLayer.enter();

      // update entering rects
      var gRects = gLayerEnter.append("g").attr("class", "layerrects")
        .attr("fill", function(d, i) {
          return colors(i);
        })
        .selectAll('g.rect')
        .data(function(d) { d.values.forEach(function(v) {v.name = d.name}); 
          return d.values})

      var rectsEnter = gRects.enter().append("g").attr("class", "rect");    

      rectsEnter.append('rect')
        .attr("opacity", 0.1)
        .attr("class", "layerrects")
        .attr("x", function(d) {
        return xScale(d.x);
      })
        .attr("y", height)
        .attr("width", xScale.rangeBand())
        .attr("height", 0);

      // update the chillin rects
      g.selectAll('g.rect')
        .select('rect')
        .transition()
        .duration(duration)
        .attr("opacity", 1)
        .attr("y", function(d) {
        return yScale(d.y0 + d.y);
      })
        .attr("height", function(d) {
        return yScale(d.y0) - yScale(d.y0 + d.y);
      });




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




      // // handle change from/to stacked/grouped
      // d3.selectAll("input").on("change", change);
      
      // function change() {
      //   if (this.value === "grouped") transitionGrouped();
      //   else transitionStacked();
      // }

      // rect.transition()
      //   .delay(function(d, i) {
      //   return i * 10;
      // })
      //   .attr("y", function(d) {
      //   return yScale(d.y0 + d.y);
      // })
      //   .attr("height", function(d) {
      //   return yScale(d.y0) - yScale(d.y0 + d.y);
      // });

      // function transitionGrouped() {
      //   yScale.domain([0, yGroupMax]);

      //   rect.transition()
      //     .duration(500)
      //     .delay(function(d, i) {
      //     return i * 10;
      //   })
      //     .attr("x", function(d, i, j) {
      //     return xScale(d.x) + xScale.rangeBand() / numLayers * j;
      //   })
      //     .attr("width", xScale.rangeBand() / numLayers)
      //     .transition()
      //     .attr("y", function(d) {
      //     return yScale(d.y);
      //   })
      //     .attr("height", function(d) {
      //     return height - yScale(d.y);
      //   });
      // }

      // function transitionStacked() {
      //   yScale.domain([0, yStackMax]);

      //   rect.transition()
      //     .duration(500)
      //     .delay(function(d, i) {
      //     return i * 10;
      //   })
      //     .attr("y", function(d) {
      //     return yScale(d.y0 + d.y);
      //   })
      //     .attr("height", function(d) {
      //     return yScale(d.y0) - yScale(d.y0 + d.y);
      //   })
      //     .transition()
      //     .attr("x", function(d) {
      //     return xScale(d.x);
      //   })
      //     .attr("width", xScale.rangeBand());
      // }

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