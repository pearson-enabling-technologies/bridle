Bridle.StackedChart = function() {

  var margin = {top:50, bottom:30, left:100, right:100};
  var height = 400;
  var width  = 1000;
  var xValue = function(d) { return d.x };
  var yValue = function(d) { return d.y };
  var nameValue = function(d) {return d.name}
  var style  = 'stack';
  var offset = 'zero';
  var order  = 'default';
  var interpolate = 'linear';
  var xScale = d3.time.scale.utc().nice();
  var yScale = d3.scale.linear().nice();
  var colors = d3.scale.category10();
  var xAxis  = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis  = d3.svg.axis().scale(yScale).orient("left");
  xAxis.tickSize(-height + margin.top + margin.bottom, 0); // get/set?
  xAxis.tickSubdivide(true); // get/set?
  var area   = d3.svg.area().interpolate(interpolate).x(X).y0(Y0).y1(Y1);
  var title  = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;
  var legend = Bridle.LegendBox().nameAccessor( function(d) { return d.name} );
  var dispatch = d3.dispatch('showTooltip', 'hideTooltip', "pointMouseover", "pointMouseout");
  // x accessor
  function X(d) {
    return xScale(xValue(d));
  };

  // y-0 accessor
  function Y0(d) {
    return yScale(d.y0);
  };

  // y-1 accessor
  function Y1(d) {
    return yScale(d.y0 + d.y);
  };

  function chart (selection) {
    selection.each(function(rawData) {
      var containerID = this;
      data = rawData.filter(function(d) { return !d.disabled })

      // convert the data to an appropriate representation
      data = d3.layout.stack()
                .offset(offset)
                .order(order)
                .values(function(d) { return d.values})
                .x(xValue)
                .y(yValue)
                (data); // we pass the data as context


      // setup the scales
      // x scale
      xScale.range([0, width - margin.left - margin.right]);

      // get max and min date(s)
      var maxDates = data.map(function(d) {
        return d3.max(d.values, function(e) {
          return xValue(e)
        });
      });
      var minDates = data.map(function(d) {
        return d3.min(d.values, function(e) {
          return xValue(e)
        });
      });


      xScale.domain([d3.min(minDates), d3.max(maxDates)]);
      // y scale
      yScale.range([height - margin.top - margin.bottom, 0]);

      // find out the y max
      var maxYs = data.map(function(d) {
        return d3.max(d.values, function(val) {
          return val.y + val.y0;
        })
      })

      yScale.domain([0, d3.max(maxYs)]);

      // // x axis ticks
      // xAxis.ticks(data[0].values.length)


      // set up the scaffolding
      // note: enter only fires if data is empty
      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "areas");
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
        .attr("transform","translate(" + (width - margin.left - margin.right + 20) + "," + 0 + ")")
        .style("font-size","12px");


      // update the outer dimensions
      svg 
        .attr("width", width)
        .attr("height", height)

      // update the inner dimensions
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // reasign the data to trigger addition/deletion
      var gArea = g.select('.areas').selectAll('.area')
          .data(function(d) {
          return d
        },function(d) {
          return nameValue(d)
        } )
          .classed('hover', function(d) { 
            return d.hover })

      var gAreaEnter = gArea.enter();
      // add paths
      gAreaEnter.append("path")
        .attr("class", "area")
          .attr("fill", function(d,i) {
            return colors(nameValue(d));
          })
          .attr("opacity", 0)
          .attr("d", function(d) {
            return area(d.values);
          });
      gArea.exit()
          // can't figure out why this transition stops the area being removed.
          // .transition()
          // .duration(duration)
          // .style('stroke-opacity', 1e-6)
          // .style('fill-opacity', 1e-6)
          .remove();


      // reasign the data to trigger points
      var gPoints = g.select('.points').selectAll('g.seriespoints')
          .data(function(d) { return d });

      gPoints.exit()
          .transition()
          .duration(duration)
          .style('r', 0)
          .style('opacity', 1e-6)         
        .remove();

      var gPointsEnter = gPoints.enter();



      // update entering points
      var gCircles = gPointsEnter.append("g").attr("class", "seriespoints")
          .selectAll('g.circle')
          .data(function(d) { d.values.forEach(function(v) {v.name = nameValue(d)}); 
            return d.values})      

      // update chilling points
      gPoints.selectAll('g.circle')
          .data(function(d) { d.values.forEach(function(v) {v.name = nameValue(d)}); 
            return d.values})

      var circlesEnter = gCircles.enter().append("g").attr("class", "circle");

      circlesEnter.append('circle')
        .attr("opacity", 0.1)
        .attr("class", "seriespoint")
        .attr('r', 0)
        .attr('cx', function (d) {
          return X(d)
        })
        .attr('cy', function (d) {
          return Y1(d)
        })
          .on('mouseover', function(d, i, j) {
            dispatch.pointMouseover({
              x: xValue(d),
              y: yValue(d),
              series: d.name,
              pos: [xScale(xValue(d)), yScale(d.y0 + d.y)],
              pointIndex: i,
              seriesIndex: j
            });
          })
          .on('mouseout', function(d) {
            dispatch.pointMouseout({
              // point: d,
              // series: data[d.series],
              // pointIndex: d.point,
              // seriesIndex: d.series
            });
          });

      // update the areas
      g.selectAll('path.area')
          .attr("fill", function(d,i) {
            return colors(nameValue(d));
          })
          .transition()
          .duration(duration)
          .attr("opacity", 0.9)
          .attr("d", function(d) {
            return area(d.values);
          });

      // update the circles
      g.selectAll('g.circle')
          .select('circle')
          .transition()
          .duration(duration)
          .attr('r', 5)
        .attr('cx', function (d) {
          return X(d)
        })
        .attr('cy', function (d) {
          return Y1(d)
        });

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
        .attr("x", (-height + margin.top + margin.bottom) / 2)        
        .attr("dy", ".1em")
        .text(yAxisTitle);

        if (legend.numData() != rawData.length) {
          // update the legend
          g.select('.legend')
            .datum(data)
            .call(legend);
        }

        legend.dispatch.on('legendClick', function(d, i) {
          d.disabled = !d.disabled;

          if (!data.filter(function(d) { return !d.disabled }).length) {
            data.forEach(function(d) {
              d.disabled = false;
            });
          }

          selection.call(chart)
        });


        legend.dispatch.on('legendMouseover', function(d, i) {
          d.hover = true;
          selection.call(chart)
        });

        legend.dispatch.on('legendMouseout', function(d, i) {
          d.hover = false;
          selection.call(chart)
        });

        dispatch.on('pointMouseover.tooltip', function(e) {
          var offset = $(containerID).offset(), // { left: 0, top: 0 }
              left = e.pos[0] + offset.left + margin.left,
              top = e.pos[1] + offset.top + margin.top,
              formatterX = d3.time.format("%Y-%m-%d")
              formatterY = d3.format(".02f");

          var content = '<h3>' + e.series + '</h3>' +
                        '<p>' +
                        '<span class="value">[' + formatterX(e.x) + ', ' + formatterY(e.y) + ']</span>' +
                        '</p>';

          nvtooltip.show([left, top], content);
        });

        dispatch.on('pointMouseout.tooltip', function(e) {
          nvtooltip.cleanup();
        });       




     

    });
  }

  chart.dispatch = dispatch;

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
  };

  chart.yAxis = function(_) {
    if (!arguments.length) return yAxis;
    yAxis = _;
    return chart;
  };

  chart.yAxisTitle = function(_) {
    if (!arguments.length) return yAxisTitle;
    yAxisTitle = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };

  chart.legend = function(_) {
    if (!arguments.length) return legend;
    legend = _;
    return chart;
  };

  chart.xValue = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.yValue = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.nameValue = function(_) {
    if (!arguments.length) return nameValue;
    nameValue = _;
    return chart;
  };

  chart.colors = function(_) {
    if (!arguments.length) return colors;
    colors = _;
    return chart;
  };
  
  return chart;
}