// a Bar chart
Bridle.BarChart = function() {

  var mode = 'stacked';
  var margin = {
    top    : 50,
    bottom : 100,
    left   : 100,
    right  : 100
  };
  var height = 400;
  var width = 1000;
  var xValue = function(d) {
    return d.x;
  };
  var yValue = function(d) {
    return d.y;
  };
  var nameValue = function(d) {
    return d.name;
  };
  var values = function(d) {
    return d.values;
  };
  var offset = 'zero';
  var order = 'default';
  var yScale = d3.scale.linear();
  var colors = d3.scale.category10();

  var yAxis = d3.svg.axis().scale(yScale).orient('left');
  var title = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;
  var legend = Bridle.LegendBox().nameAccessor(function(d) {
    return nameValue(d);
  });
  // set legend's colors to be the same as for the chart
  legend.colors(colors);

  var xScale = d3.scale.ordinal();
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickSize(5)
    .orient('bottom');

  var tickFormat = d3.time.format('%Y-%m-%d');

  var formatterX = d3.time.format('%Y-%m-%d');
  var formatterY = d3.format('.02f');

  function toDate(e) {
    return new Date(e);
  }

  var sortByDateDesc = function(a, b) {
    return toDate(xValue(a)) > toDate(xValue(b)) ? 1 : -1;
  };

  var dispatch = d3.dispatch('showTooltip', 'hideTooltip', 'pointMouseover', 'pointMouseout');

  function chart(selection) {
    selection.each(function(rawData) {
      var containerID = this;
      // preserve rawData variable (needed to control updates of legend module)
      var data = rawData.filter(function(d) {
        return !d.disabled;
      });
      //sort the data points in each layer
      data.forEach(function(layer) {
        values(layer).sort(sortByDateDesc);
      });

      // convert the data to an appropriate representation
      data = d3.layout.stack()
        .offset(offset)
        .order(order)
        .values(values)
        .x(xValue)
        .y(yValue)
      (data); // we pass the data as context

      var legendWidth = legend.width();
      // we set the height of the legend as the same as
      // the chart
      legend.height(height);

      // set up scales and axes
      xScale.domain(data[0].values.map(function(d) {
        return xValue(d);
      }))
        .rangeRoundBands([0, width - (margin.right + legendWidth)], 0.1);

      // how many data points are there in each layer on average 
      var avgDataPoints = function() {
        var sumPoints = 0;
        data.forEach(function(layer) {
          sumPoints += layer.values.length;
        });
        // //console.log('THIS', sumPoints, data.length, sumPoints / data.length)
        return (sumPoints / data.length);
      };

      xAxis.tickFormat(tickFormat)
        .tickValues(xScale.domain().filter(function(d, i) {
          var nthLabel = Math.ceil(200 / (width / avgDataPoints()));
          // //console.log(nthLabel)
          return i % nthLabel === 0;
        }));

      var yGroupMax = d3.max(data, function(layer) {
        return d3.max(layer.values, function(d) {
          return d.y;
        });
      });

      var yStackMax = d3.max(data, function(layer) {
        return d3.max(layer.values, function(d) {
          return d.y0 + d.y;
        });
      });

      var numLayers = data.length;

      yScale.range([height - margin.top - margin.bottom, 0]);

      if (mode === 'stacked') {
        yScale.domain([0, yStackMax]);
      }
      else {
        yScale.domain([0, yGroupMax]);
      }

      // functions for rect attributes depending on stacked/group mode
      var xScaleMode = function(d, i, j) {
        if (mode === 'stacked') {
          return xScale(xValue(d));
        }
        else {
          return xScale(xValue(d)) + xScale.rangeBand() / numLayers * j;
        }
      };
      var yScaleMode = function(d) {
        if (mode === 'stacked') {
          return yScale(d.y0 + d.y);
        }
        else {
          return yScale(d.y);
        }
      };
      var heightMode = function(d) {
        if (mode === 'stacked') {
          return yScale(d.y0) - yScale(d.y0 + d.y);
        }
        else {
          return height - yScale(d.y) - margin.top - margin.bottom;
        }
      };
      var widthMode = function() {
        if (mode === 'stacked') {
          return xScale.rangeBand();
        }
        else {
          return xScale.rangeBand() / numLayers;
        }
      };

      // set up the scaffolding
      // note: enter only fires if data is empty
      var svg = d3.select(containerID).selectAll('svg').data([data]);
      var gEnter = svg.enter().append('svg').attr('class', 'bridle').append('g');
      gEnter.append('g').attr('class', 'rects');
      gEnter.append('g').attr('class', 'x axis');
      gEnter.append('g').attr('class', 'y axis').append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.72em')
        .attr('class', 'y axis label')
        .attr('text-anchor', 'middle');
      gEnter.append('svg:text').attr('class', 'chartTitle label')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .attr('transform', 'translate(' + (width - margin.left - margin.right + 20) / 2 + ',' + (-margin.top) + ')');
      gEnter.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + (width - (margin.right + legendWidth) + 20) + ',' + 0 + ')')
        .style('font-size', '12px');

      // update the outer dimensions
      svg.attr('width', width)
        .attr('height', height);

      // update the inner dimensions
      var g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // reasign the data to trigger points
      // specify a key function based on *name*, 
      // so that entering/exiting works properly when filters are triggered
      var gLayer = g.select('.rects').selectAll('g.layerrects')
        .data(function(d) {
          return d;
        }, function(d) {
          return nameValue(d);
        })
        .classed('hover', function(d) {
          return d.hover;
        });

      gLayer
        .exit()
        .transition()
        .duration(duration)
        .style('stroke-opacity', 1e-6)
        .style('fill-opacity', 1e-6)
        .remove();

      var gLayerEnter = gLayer.enter();

      // update entering rects
      var gRects = gLayerEnter.append('g').attr('class', 'layerrects')
        .attr('fill', function(d) {
          return colors(nameValue(d));
        })
        .selectAll('g.rect')
        .data(function(d) {
          d.values.forEach(function(v) {
            v.name = nameValue(d);
          });
          return d.values;
        });

      gRects.exit()
        .transition()
        .duration(duration)
        .style('stroke-opacity', 1e-6)
        .style('fill-opacity', 1e-6)
        .remove();

      var rectsEnter = gRects.enter().append('g').attr('class', 'rect');

      rectsEnter.append('rect')
        .attr('opacity', 0.1)
        .attr('x', function(d, i, j) {
          return xScaleMode(d, i, j);
        })
        .attr('y', function() {
          return height - margin.top - margin.bottom;
        })
        .attr('width', function() {
          return widthMode();
        })
        .attr('height', 0)
        .on('mouseover', function(d, i, j) {
          dispatch.pointMouseover({
            x           : xValue(d),
            y           : yValue(d),
            series      : d.name,
            pos         : [xScale(xValue(d)), yScaleMode(d)],
            pointIndex  : i,
            seriesIndex : j
          });
        })
        .on('mouseout', function() {
          dispatch.pointMouseout({
            // point: d,
            // series: data[d.series],
            // pointIndex: d.point,
            // seriesIndex: d.series
          });
        });

      // update the chillin rects
      g.selectAll('g.layerrects').selectAll('g.rect')
        .select('rect')
        .transition()
        .duration(duration)
        .attr('opacity', 0.9)
        .attr('y', function(d) {
          return yScaleMode(d);
        })
        .attr('height', function(d) {
          return heightMode(d);
        })
        .attr('width', function() {
          return widthMode();
        })
        .attr('x', function(d, i, j) {
          return xScaleMode(d, i, j);
        });

      // update the title
      g.select('text.chartTitle')
        .text(title);

      // update the x-axis
      g.select('.x.axis')
        .attr('transform', 'translate(0,' + yScale.range()[0] + ')')
        .call(xAxis);

      // update the y-axis
      g.select('.y.axis')
        //.attr('transform', 'translate(')
        .transition()
        .duration(duration)
        .attr('transform', 'translate(-25,0)')
        .call(yAxis);

      g.select('.y.axis.label')
        .attr('y', -45)
        .attr('x', (-height + margin.top + margin.bottom) / 2)
        .attr('dy', '.1em')
        .text(yAxisTitle);

      function change() {
        ////console.log('mode change')
        if (this.value === 'grouped') {
          mode = 'grouped';
          yScale.domain([0, yGroupMax]);
          transitionGrouped();
        } else {
          mode = 'stacked';
          yScale.domain([0, yStackMax]);
          transitionStacked();
        }
      }

      // handle change from/to stacked/grouped
      d3.selectAll('input.bridle.modeChanger').on('change', change);

      // transition to grouped layout
      function transitionGrouped() {
        // update the y-axis
        g.select('.y.axis')
          //.attr('transform', 'translate(')
          .transition()
          .duration(duration)
          .attr('transform', 'translate(-25,0)')
          .call(yAxis);

        g.selectAll('g.layerrects').selectAll('rect')
          .transition()
          .duration(500)
          .delay(function(d, i) {
            return i * 10;
          })
          .attr('x', function(d, i, j) {
            // //console.log(d,i,j)
            return xScale(xValue(d)) + xScale.rangeBand() / numLayers * j;

          })
          .attr('width', xScale.rangeBand() / numLayers)
          .transition()
          .attr('y', function(d) {
            return yScale(d.y);
          })
          .attr('height', function(d) {
            return height - yScale(d.y) - margin.top - margin.bottom;
          });
      }

      //transition to stacked layout
      function transitionStacked() {

        // update the y-axis
        g.select('.y.axis')
          //.attr('transform', 'translate(')
          .transition()
          .duration(duration)
          .attr('transform', 'translate(-25,0)')

          .call(yAxis);

        g.selectAll('g.layerrects').selectAll('rect')
          .transition()
          .duration(500)
          .delay(function(d, i) {
            return i * 10;
          })
          .attr('y', function(d) {
            return yScale(d.y0 + d.y);
          })
          .attr('height', function(d) {
            return yScale(d.y0) - yScale(d.y0 + d.y);
          })
          .transition()
          .attr('x', function(d) {
            return xScale(xValue(d));
          })
          .attr('width', xScale.rangeBand());
      }

      // update the legend only if the data has changed
      if (legend.numData() !== rawData.length) {
        // update the legend
        g.select('.legend')
          .datum(rawData)
          .call(legend);
      }

      // listen for click events from the legend module, 
      // filter the relevant data series
      legend.dispatch.on('legendClick', function(d) {
        d.disabled = !d.disabled;
        // disallow deactivating last active legend item
        if (!data.some(function(d) {
          return !d.disabled;
        })) {
          d.disabled = false;
        }
        selection.call(chart);
      });

      // listen for mouseover events from legend module
      // flag 'hover' on data series
      legend.dispatch.on('legendMouseover', function(d) {
        d.hover = true;
        selection.call(chart);
      });

      // listen for mouseout events from legend module
      // remove 'hover' from data series
      legend.dispatch.on('legendMouseout', function(d) {
        d.hover = false;
        selection.call(chart);
      });

      // listen for mouseover events within this module
      // (i.e. on rectangles) and show tooltip
      dispatch.on('pointMouseover.tooltip', function(e) {
        var offset = $(containerID).offset(), // { left: 0, top: 0 }
          left = e.pos[0] + offset.left + margin.left,
          top = e.pos[1] + offset.top + margin.top;

        var content = '<h3>' + e.series + '</h3>' +
          '<p>' +
          '<span class="value">[' + formatterX(e.x) + ', ' + formatterY(e.y) + ']</span>' +
          '</p>';

        Bridle.tooltip.show([left, top], content);
      });

      // listen for mouseout events within this module
      // hide tooltip
      dispatch.on('pointMouseout.tooltip', function() {
        Bridle.tooltip.cleanup();
      });

    });
  }

  chart.dispatch = dispatch;

  chart.margin = function(_) {
    if (!arguments.length) {
      return margin;
    }
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) {
      return width;
    }
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) {
      return height;
    }
    height = _;
    return chart;
  };

  chart.title = function(_) {
    if (!arguments.length) {
      return title;
    }
    title = _;
    return chart;
  };

  chart.xAxis = function(_) {
    if (!arguments.length) {
      return xAxis;
    }
    xAxis = _;
    return chart;
  };

  chart.yAxis = function(_) {
    if (!arguments.length) {
      return yAxis;
    }
    yAxis = _;
    return chart;
  };

  chart.yAxisTitle = function(_) {
    if (!arguments.length) {
      return yAxisTitle;
    }
    yAxisTitle = _;
    return chart;
  };

  chart.duration = function(_) {
    if (!arguments.length) {
      return duration;
    }
    duration = _;
    return chart;
  };

  chart.tickFormat = function(_) {
    if (!arguments.length) {
      return tickFormat;
    }
    tickFormat = _;
    return chart;
  };

  chart.legend = function(_) {
    if (!arguments.length) {
      return legend;
    }
    legend = _;
    return chart;
  };

  chart.xValue = function(_) {
    if (!arguments.length) {
      return xValue;
    }
    xValue = _;
    return chart;
  };

  chart.yValue = function(_) {
    if (!arguments.length) {
      return yValue;
    }
    yValue = _;
    return chart;
  };

  chart.nameValue = function(_) {
    if (!arguments.length) {
      return nameValue;
    }
    nameValue = _;
    return chart;
  };

  chart.values = function(_) {
    if (!arguments.length) {
      return values;
    }
    values = _;
    return chart;
  };

  chart.colors = function(_) {
    if (!arguments.length) {
      return colors;
    }
    colors = _;
    /* set the colors for the legend as well */
    chart.legend().colors(colors);
    return chart;
  };

  chart.mode = function(_) {
    if (!arguments.length) {
      return mode;
    }
    mode = _;
    return chart;
  };

  chart.formatterX = function(_) {
    if (!arguments.length) {
      return formatterX;
    }
    formatterX = _;
    return chart;
  };

  chart.formatterY = function(_) {
    if (!arguments.length) {
      return formatterY;
    }
    formatterY = _;
    return chart;
  };

  return chart;
};
