  function barChart() {

    var margin = {
      top: 50,
      bottom: 100,
      left: 100,
      right: 100
    };
    var height = 400;
    var width = 1000;
    var xValue = function(d) {
      return d.x;
    };
    var yValue = function(d) {
      return d.y;
    };
    var nameValue = function (d) {
      return d.name;
    }
    var offset = 'zero';
    var order = 'default';
    var yScale = d3.scale.linear();    
    var colors = d3.scale.category10();

    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    var title = 'Chart Title';
    var yAxisTitle = 'Axis Title';
    var duration = 1000;
    var legend = legendBox().nameAccessor(nameValue);

    var xScale = d3.scale.ordinal()
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickSize(5)
      .orient("bottom");

    var tickFormat = d3.time.format("%Y-%m-%d");
    var xAxisFontSize = 10;
    var yAxisFontSize = 10;

    function toDate(e) {
      return new Date(e);
    }
    var sortByDateDesc = function(a, b) {
      return toDate(xValue(a)) > toDate(xValue(b)) ? 1 : -1;
    };
    var sortByDateAsc = function(a, b) {
      return toDate(xValue(b)) < toDate(xValue(a)) ? 1 : -1;
    };

    var dispatch = d3.dispatch('showTooltip', 'hideTooltip', "pointMouseover", "pointMouseout");

    function chart(selection) {
      selection.each(function(rawData) {


        var data = rawData.filter(function(d) { return !d.disabled })
        //sort the data points in each layer
        data.forEach(function(layer) {
          layer.values.sort(sortByDateDesc)
        });

        // how many data points are there in each layer on average 
        var avgDataPoints = function() {
          var sumPoints = 0;
          data.forEach(function(layer) {
            sumPoints += layer.values.length;
          });
          // console.log("THIS", sumPoints, data.length, sumPoints / data.length)
          return (sumPoints / data.length);
        }



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

        xScale.domain(data[0].values.map(function(d) {
          return xValue(d);
        }))
          .rangeRoundBands([0, width - margin.left - margin.right], 0.1);

        xAxis.tickFormat(tickFormat)
          .tickValues(xScale.domain().filter(function(d, i) {
          var nthLabel = Math.ceil(200 / (width / avgDataPoints()));
          // console.log(nthLabel)
          return !(i % nthLabel);
        }))

        var yGroupMax = d3.max(data, function(layer) {
          return d3.max(layer.values, function(d) {
            return d.y;
          });
        })

        var yStackMax = d3.max(data, function(layer) {
          return d3.max(layer.values, function(d) {
            return d.y0 + d.y;
          });
        });

        var numLayers = data.length;
        
        var maxLayerLength = d3.max(data, function(layer) {
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
          .attr("class", "legend")
          .attr("transform", "translate(" + (width - margin.left - margin.right + 20) + "," + 0 + ")")
          .style("font-size", "12px");

        // update the outer dimensions
        svg.attr("width", width)
          .attr("height", height)

        // update the inner dimensions
        var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // reasign the data to trigger points
        // specify a key function based on *name*, 
        // so that entering/exiting works properly when filters are triggered
        var gLayer = g.select('.rects').selectAll('g.layerrects')
          .data(function(d) {
          return d
        },function(d) {
          return nameValue(d)
        } )
          .classed('hover', function(d) { 
            return d.hover })                     

        gLayer.exit()
          // .transition()
          // .duration(500)
          // .style('stroke-opacity', 1e-6)
          // .style('fill-opacity', 1e-6)
          .remove();

        var gLayerEnter = gLayer.enter();

        // update entering rects
        var gRects = gLayerEnter.append("g").attr("class", "layerrects")
          .attr("fill", function(d, i) {
          return colors(nameValue(d));
        })
          .selectAll('g.rect')
          .data(function(d) {
          d.values.forEach(function(v) {
            v.name = nameValue(d)
          });
          return d.values
        })

        gRects.exit()
          .remove();


        var rectsEnter = gRects.enter().append("g").attr("class", "rect");

        rectsEnter.append('rect')
          .attr("opacity", 0.1)
          .attr("x", function(d) {
          return xScale(xValue(d));
        })
          .attr("y", height - margin.top - margin.bottom)
          .attr("width", xScale.rangeBand())
          .attr("height", 0)
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

        // update the chillin rects
        g.selectAll('g.rect')
          .select("rect")
          .transition()
          .duration(duration)
          .attr("opacity", 0.9)
          .attr("y", function(d) {
          return yScale(d.y0 + d.y);
        })
          .attr("height", function(d) {
          return yScale(d.y0) - yScale(d.y0 + d.y);
        })

      // update the title
      g.select("text.chartTitle")
        .text(title)

        // update the x-axis
        g.select(".x.axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis)
        // .selectAll("text") 
        // .style("text-anchor", "end")
        // .attr("dx", "-.8em")
        // .attr("dy", ".15em")
        // .attr("transform", function(d) {
        //     return "rotate(-65)" 
        //     });

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

        // handle change from/to stacked/grouped
        d3.selectAll("input").on("change", change);

        function change() {
          if (this.value === "grouped") transitionGrouped();
          else transitionStacked();
        }

        // transition to grouped layout

        function transitionGrouped() {
          yScale.domain([0, yGroupMax]);

          g.selectAll('g.layerrects').selectAll('rect')
            .transition()
            .duration(500)
            .delay(function(d, i) {
            return i * 10;
          })
            .attr("x", function(d, i, j) {
            // console.log(d,i,j)
            return xScale(xValue(d)) + xScale.rangeBand() / numLayers * j;
          })
            .attr("width", xScale.rangeBand() / numLayers)
            .transition()
            .attr("y", function(d) {
            return yScale(d.y);
          })
            .attr("height", function(d) {
            return height - yScale(d.y) - margin.top - margin.bottom;
          });
        }

        //transition to stacked layout

        function transitionStacked() {
          yScale.domain([0, yStackMax]);

          g.selectAll('g.layerrects').selectAll('rect')
            .transition()
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
            return xScale(xValue(d));
          })
            .attr("width", xScale.rangeBand());
        }

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
          dispatch.showTooltip({
            x: e.x,
            y: e.y,
            series: e.series,
            pos: [e.pos[0] + margin.left, e.pos[1] + margin.top],
            seriesIndex: e.seriesIndex,
            pointIndex: e.pointIndex
          });
        });

        dispatch.on('pointMouseout.tooltip', function(e) {
          dispatch.hideTooltip(e);
        });        


      })
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

    chart.tickFormat = function(_) {
      if (!arguments.length) return tickFormat;
      tickFormat = _;
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