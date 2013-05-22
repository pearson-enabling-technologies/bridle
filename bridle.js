(function () {

// create global namespace
var Bridle = window.Bridle || {};

/*****
 * Really simple tooltip implementation, stolen from nvtooltip
 *****/

Bridle.tooltip = {

  show: function(pos, content, gravity, dist) {
    var container = $('<div class="bridle tooltip">');

    gravity = gravity || 's';
    dist = dist || 20;

    container
      .html(content)
      .css({left: -1000, top: -1000, opacity: 0})
      .appendTo('body');

    var height = container.height() + parseInt(container.css('padding-top'))  + parseInt(container.css('padding-bottom')),
        width = container.width() + parseInt(container.css('padding-left'))  + parseInt(container.css('padding-right')),
        windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        scrollTop = $('body').scrollTop(),  //TODO: also adjust horizontal scroll
        left, top;


    //TODO: implement other gravities
    switch (gravity) {
      case 'e':
      case 'w':
      case 'n':
        left = pos[0] - (width / 2);
        top = pos[1] + dist;
        if (left < 0) left = 5;
        if (left + width > windowWidth) left = windowWidth - width - 5;
        if (scrollTop + windowHeight < top + height) top = pos[1] - height - dist;
        break;
      case 's':
        left = pos[0] - (width / 2);
        top = pos[1] - height - dist;
        if (left < 0) left = 5;
        if (left + width > windowWidth) left = windowWidth - width - 5;
        if (scrollTop > top) top = pos[1] + dist;
        break;
    }

    container
        .css({
          left: left,
          top: top,
          opacity: 1
        });
  },

  cleanup : function() {
    var tooltips = $('.bridle.tooltip');

    // remove right away, but delay the show with css
    tooltips.css({
        'transition-delay': '0 !important',
        '-moz-transition-delay': '0 !important',
        '-webkit-transition-delay': '0 !important'
    });

    tooltips.css('opacity',0);

    setTimeout(function() {
      tooltips.remove()
    }, 500);
  }

}
// The legend box
Bridle.LegendBox = function() {
  var margin = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  };
  var height = 200;
  var width = 200;
  var style = 'stack';
  var offset = 'zero';
  var order = 'default';
  var colors = d3.scale.category10();
  var title = 'Chart Title';
  var duration = 1000;
  var itemLineSpacing = 20;
  var xPadding = "1em";
  var nameAccessor = function(d) { return d.name };
  var dispatch = d3.dispatch('legendClick', 'legendMouseover', 'legendMouseout');
  var numData;

  function chart(selection) {
    selection.each(function(data) {
      numData = data.length;
      // set up scaffolding
      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").attr('class', 'bridle').append("g")
      gEnter.append("g").attr("class", 'legend');

      //update outer dimensions
      svg.attr("width", width)
        .attr("height", height);

      //update inner dimensions
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // reassign the data to trigger addition / deletion
      var gLegendItem = g.select(".legend").selectAll('.legendItem')
        .data(function (d) { return d });

      // add g for each legend item
      var gLegendItemEnter = gLegendItem.enter()
        .append("g")   
        .attr("class", "legendItem")
          .on('click', function(d, i) {
            dispatch.legendClick(d, i);
            gLegendItem.classed('disabled', function(d) { return d.disabled });
          })
          .on('mouseover', function(d, i) {
            dispatch.legendMouseover(d, i);
          })
          .on('mouseout', function(d, i) {
            dispatch.legendMouseout(d, i);
          });

      // add circles and text elements
      gLegendItemEnter.append("circle")
        .attr("class", "circle")
        .attr("cx", 0)
        .attr("cy",function(d,i) { 
          // console.log(d,i)
          return -0.25+"em"})
        .attr("r","0.4em")
        .attr("stroke-width", 1)
        .attr("stroke", function(d, i) {
        return colors(i)
      })
        .attr("fill", function(d, i) {
        return colors(i)
      });

      gLegendItemEnter.append("text")
        .attr("class", "text")      
        // .attr("y",function(d,i) { return +"em"})
        .attr("x", xPadding)
        .text(function(d) {
          return nameAccessor(d)});

      gLegendItem.classed('disabled', function(d) { return d.disabled });
      gLegendItem.exit()
        .remove();

      var yPos = 5,
        newYpos = 0,
        xPos = 5,
        maxLength = 0;
      
      gLegendItem
          .attr("opacity", 0)
          .attr('transform', function(d, i) {
             var length = d3.select(this).select('text').node().getComputedTextLength() + 28;
             if (length > maxLength) maxLength = length;
             yPos += newYpos;

             // if y has reached the vertical limit
             if (yPos > height - margin.top - margin.bottom) {
               yPos = 5;
               xPos += maxLength;
             }

             // TO DO: handle horizonal limit cut-off remaining legendItems?
             // // if x has reached the horizontal limit
             // ...

             newYpos = 20;

             return 'translate(' + xPos + ',' + yPos + ')';
          })
          .transition()
          .duration(duration)
          .attr("opacity", 1)

      // //position legend to the top left + margin
      // g.attr('transform', 'translate(' + (margin.left) + ',' + margin.top + ')');

      // height = margin.top + margin.bottom + ypos + 15; 


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

  chart.duration = function(_) {
    if (!arguments.length) return duration;
    duration = _;
    return chart;
  };

  chart.colors = function(_) {
    if (!arguments.length) return colors;
    colors = _;
    return chart;
  };

  chart.nameAccessor = function(_) {
    if (!arguments.length) return nameAccessor;
    nameAccessor = _;
    return chart;
  };
  chart.numData = function(_) {
    if (!arguments.length) return numData;
    numData = _;
    return chart;
  };

  return chart;
};
// a Bar chart
Bridle.BarChart = function () {

    var mode = "stacked";
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
    var nameValue = function(d) {
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
    var legend = Bridle.LegendBox().nameAccessor(nameValue);

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
        var containerID = this;
        // preserve rawData variable (needed to control updates of legend module)
        var data = rawData.filter(function(d) {
          return !d.disabled
        })
        //sort the data points in each layer
        data.forEach(function(layer) {
          layer.values.sort(sortByDateDesc)
        });

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

        // set up scales and axes
        xScale.domain(data[0].values.map(function(d) {
          return xValue(d);
        }))
          .rangeRoundBands([0, width - margin.left - margin.right], 0.1);

        // how many data points are there in each layer on average 
        var avgDataPoints = function() {
          var sumPoints = 0;
          data.forEach(function(layer) {
            sumPoints += layer.values.length;
          });
          // console.log("THIS", sumPoints, data.length, sumPoints / data.length)
          return (sumPoints / data.length);
        }

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

        yScale.range([height - margin.top - margin.bottom, 0]);

        if (mode === "stacked") yScale.domain([0, yStackMax])
        else yScale.domain([0, yGroupMax]);


        // functions for rect attributes depending on stacked/group mode
        var xScaleMode = function(d, i, j) {
          if (mode === "stacked") return xScale(xValue(d));
          else return xScale(xValue(d)) + xScale.rangeBand() / numLayers * j;
        }
        var yScaleMode = function(d) {
          if (mode === "stacked") return yScale(d.y0 + d.y);
          else return yScale(d.y);
        }
        var heightMode = function(d) {
          if (mode === "stacked") return yScale(d.y0) - yScale(d.y0 + d.y);
          else return height - yScale(d.y) - margin.top - margin.bottom;
        }
        var widthMode = function() {
          if (mode === "stacked") return xScale.rangeBand();
          else return xScale.rangeBand() / numLayers;
        }

        // set up the scaffolding
        // note: enter only fires if data is empty
        var svg = d3.select(containerID).selectAll("svg").data([data]);
        var gEnter = svg.enter().append("svg").attr("class", "bridle").append("g");
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
        }, function(d) {
          return nameValue(d)
        })
          .classed('hover', function(d) {
          return d.hover
        })

        gLayer
        .exit()
        .transition()
        .duration(duration)
        .style('stroke-opacity', 1e-6)
        .style('fill-opacity', 1e-6)
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
        .transition()
        .duration(duration)
        .style('stroke-opacity', 1e-6)
        .style('fill-opacity', 1e-6)        
          .remove();

        var rectsEnter = gRects.enter().append("g").attr("class", "rect");

        rectsEnter.append('rect')
          .attr("opacity", 0.1)
          .attr("x", function(d, i, j) {
          return xScaleMode(d, i, j)
        })
          .attr("y", function(d) {
          return height - margin.top - margin.bottom
        })
          .attr("width", function() {
          return widthMode();
        })
          .attr("height", 0)
          .on('mouseover', function(d, i, j) {
          dispatch.pointMouseover({
            x: xValue(d),
            y: yValue(d),
            series: d.name,
            pos: [xScale(xValue(d)), yScaleMode(d)],
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
        g.selectAll('g.layerrects').selectAll('g.rect')
          .select("rect")
          .transition()
          .duration(duration)
          .attr("opacity", 0.9)
          .attr("y", function(d) {
          return yScaleMode(d)
        })
          .attr("height", function(d) {
          return heightMode(d)
        })
          .attr("width", function() {
          return widthMode();
        })
          .attr("x", function(d, i, j) {
          return xScaleMode(d, i, j)
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
          console.log("mode change")
          if (this.value === "grouped") {
            mode = "grouped";
            yScale.domain([0, yGroupMax]);
            transitionGrouped();
          } else {
            mode = "stacked";
            yScale.domain([0, yStackMax]);
            transitionStacked();
          }
        }


        // transition to grouped layout
        function transitionGrouped() {
          // update the y-axis
          g.select(".y.axis")
          //.attr("transform", "translate(")
          .transition()
            .duration(duration)
            .attr("transform", "translate(-25,0)")

            .call(yAxis)

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

          // update the y-axis
          g.select(".y.axis")
          //.attr("transform", "translate(")
          .transition()
            .duration(duration)
            .attr("transform", "translate(-25,0)")

            .call(yAxis)

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

        // update the legend only if the data has changed
        if (legend.numData() != rawData.length) {
          // update the legend
          g.select('.legend')
            .datum(data)
            .call(legend);
        }

        // listen for click events from the legend module, 
        // filter the relevant data series
        legend.dispatch.on('legendClick', function(d, i) {
          d.disabled = !d.disabled;

          if (!data.filter(function(d) {
            return !d.disabled
          }).length) {
            data.forEach(function(d) {
              d.disabled = false;
            });
          }

          selection.call(chart)
        });

        // listen for mouseover events from legend module
        // flag 'hover' on data series
        legend.dispatch.on('legendMouseover', function(d, i) {
          d.hover = true;
          selection.call(chart)
        });

        // listen for mouseout events from legend module
        // remove 'hover' from data series
        legend.dispatch.on('legendMouseout', function(d, i) {
          d.hover = false;
          selection.call(chart)
        });

        // listen for mouseover events within this module
        // (i.e. on rectangles) and show tooltip
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

          Bridle.tooltip.show([left, top], content);
        });

        // listen for mouseout events within this module
        // hide tooltip
        dispatch.on('pointMouseout.tooltip', function(e) {
          Bridle.tooltip.cleanup();
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
    
    chart.mode = function(_) {
      if (!arguments.length) return mode;
      mode = _;
      return chart;
    };

    return chart;
  };
  // create global namespace

Bridle.LineChart = function() {

  // define dimensions of graph
  var margin = {
    top: 50,
    bottom: 30,
    left: 100,
    right: 100
  };
  var height = 400;
  var width = 1000;
  var xValue = function(d) {
    return d.x
  };
  var yValue = function(d) {
    return d.y
  };
  var nameValue = function(d) {
    return d.name
  }
  var title = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;
  var xScale = d3.time.scale.utc().nice();
  var yScale = d3.scale.linear().nice();
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  xAxis.tickSize(-height + margin.top + margin.bottom, 0); // get/set?
  xAxis.tickSubdivide(true); // get/set?
  var yAxis = d3.svg.axis().scale(yScale).orient("left");
  var colors = d3.scale.category10();
  var legend = Bridle.LegendBox().nameAccessor(nameValue);
  var dispatch = d3.dispatch('showTooltip', 'hideTooltip', "pointMouseover", "pointMouseout");


  function chart(selection) {
    selection.each(function(rawData) {
      var containerID = this;
      data = rawData.filter(function(d) { return !d.disabled })

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


      xScale.domain([d3.min(minDates), d3.max(maxDates)])
        .range([0, width - margin.left - margin.right]);


      // X scale will fit all values from data[] within pixels 0-w
      //var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
      // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)

      // find out the y max
      var maxYs = data.map(function(d) {
        return d3.max(d.values, function(e) {
          return yValue(e);
        })
      })

      yScale.domain([0, d3.max(maxYs)])
        .range([height - margin.top - margin.bottom, 0]);

      // create a line function that can convert data[] into x and y points
      var line = d3.svg.line()
      // assign the X function to plot our line as we wish
      .x(function(d, i) {
        // return the X coordinate where we want to plot this datapoint
        return xScale(xValue(d));
      })
        .y(function(d) {
        // return the Y coordinate where we want to plot this datapoint
        return yScale(yValue(d));
      });


      function xx(d) {
        return xScale(xValue(d));
      };

      function yy(d) {
        return yScale(yValue(d));
      };



      // set up the scaffolding
      var svg = d3.select(this).selectAll("svg").data([data]);
      var gEnter = svg.enter().append("svg").attr("class", "bridle").append("g");
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
      gEnter.append("g").attr("class", "lines");
      gEnter.append("g").attr("class", "points");

      // update the outer dimensions
      svg.attr("width", width)
        .attr("height", height)

      // update the inner dimensions
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // reasign the data to trigger addition/deletion
      var gLine = g.select('.lines').selectAll('.line')
          .data(function(d) {
          return d
        },function(d) {
          return nameValue(d)
        } )
          .classed('hover', function(d) { 
            return d.hover })     

      gLine.exit()
          // can't figure out why this transition seems to stop the line being removed.
          // .transition()
          // .duration(duration)
          // .style('stroke-opacity', 1e-6)
          .remove();


      var gLineEnter = gLine.enter();
      // add paths
      gLineEnter.append("path")
        .attr("class", "line")
        .attr("d", function(d) {
        return line(d.values);
      })

      // reasign the data to trigger points
      var gPoints = g.select('.points').selectAll('g.seriespoints')
        .data(function(d) {
        return d
      });

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
        .data(function(d) {
        d.values.forEach(function(v) {
          v.name = nameValue(d)
        });
        return d.values
      })

      // update chilling points
      gPoints.selectAll('g.circle')
        .data(function(d) {
        d.values.forEach(function(v) {
          v.name = nameValue(d)
        });
        return d.values
      })

      var circlesEnter = gCircles.enter().append("g").attr("class", "circle");

      circlesEnter.append('circle')
        .attr("opacity", 0.1)
        .attr("class", "seriespoint")
        .attr('r', 0)
        .attr('cx', function(d) {
        return xScale(xValue(d))
      })
        .attr('cy', function(d) {
        return yScale(yValue(d))
      })
        .on('mouseover', function(d, i, j) {
          dispatch.pointMouseover({
            x: xValue(d),
            y: yValue(d),
            series: d.name,
            pos: [xScale(xValue(d)), yScale(yValue(d))],
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


      // update the lines
      g.selectAll('path.line')
        .attr("stroke", function(d, i) {
        return colors(nameValue(d));
      })
        .attr("fill", "none")
        .transition()
        .duration(duration)
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
        .attr('cx', function(d) {
        return xScale(xValue(d))
      })
        .attr('cy', function(d) {
        return yScale(yValue(d))
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
            console.log("what does this do?")
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

          Bridle.tooltip.show([left, top], content);
        });

        dispatch.on('pointMouseout.tooltip', function(e) {
          Bridle.tooltip.cleanup();
        });    

    });


  }

  chart.dispatch = dispatch;

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

  chart.yValue = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
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
};
// A stacked chart

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
      var gEnter = svg.enter().append("svg").attr('class', 'bridle').append("g");
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

          Bridle.tooltip.show([left, top], content);
        });

        dispatch.on('pointMouseout.tooltip', function(e) {
          Bridle.tooltip.cleanup();
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
};
// Table generator
Bridle.Table = function() {

  var numFormat = d3.format('.3f');
  var margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  var sortBy = "";
  var sortDesc = false;

  var unsortedData;
  var toggledColumn = false;


  function chart(selection) {
    selection.each(function(data) {
      var containerID = this;

      // first time chart is called, or rows are appended/removed, do a hard clone of the unsorted data object to store
      if (typeof unsortedData === 'undefined' || unsortedData.rows.length != data.rows.length) {
        unsortedData = $.extend(true, {}, data);
      }

      // check whether a column has already been sorted twice, revert to unsorted data
      if (toggledColumn == true && sortBy == "") {
        toggledColumn = false
        data = unsortedData
      }

      // sort data if a column is specified
      // use merge sort algorithm because it is stable (preserves order) for equal values      
      if (sortBy != "") {
        data.rows = merge_sort(data.rows, function (a,b) {
          return compare(a[getIndex(sortBy)], b[getIndex(sortBy)])
        })
      }

      // Select the table element, if it exists.
      var table = d3.select(containerID)
      // .append("table")
      // .attr("style", "margin-left: 250px")

      .selectAll("table").data([data]);

      // Otherwise, create the skeletal chart.
      var tEnter = table.enter().append("table")
        .attr("class", "table table-hover bridle")
        .attr("style", "margin-top: " + margin.top + "px; margin-bottom: " + margin.bottom + "px; margin-left: " + margin.left + "px; margin-right: " + margin.top + "px")
      var thead = tEnter.append("thead").append('tr');
      var tbody = tEnter.append("tbody");

      var headers = table.select('thead').select('tr').selectAll('th').data(function(d) {
        return d.headers;
      })
      // assume a list of headers
      var hEnter = headers.enter().append('th')

      // now be a body
      // add the rows
      var rows = table.select('tbody').selectAll('tr').data(function(d) {
        return d.rows
      })


      rowsEnter = rows.enter().append('tr')
            
      rows.exit().remove()

      var cells = rows.selectAll('td').data(function(d) {
        return d;
      })


      cells.enter() 
        .append("td")

      table.selectAll('th')
        .style('text-align', function(d) {
        if (isNumber(d)) {
          return 'right'
        }
        return 'left'
      })
        .html(function(d) {
        return d
      })
      .on('click', function(d, i) {
        if (toggledColumn == true) {
          d3.select(containerID).call(chart.sortBy(""));          
        }
        else {
          // if column is already sorted, mark toggledColumn as true       
          if (i == getIndex(sortBy)) {
            sortDesc = !sortDesc;
            toggledColumn = true;
          }
          else toggledColumn = false;

          d3.select(containerID).call(chart.sortBy(d));
        }
      })
      .each(function(d, i) {
        if (i == getIndex(sortBy)) {
          if (sortDesc) {
            d3.select(this).append('span').attr('class', 'desc')
          } else {
            d3.select(this).append('span').attr('class', 'asc')
          }
        }
      })



      table.selectAll('td')
        .style('text-align', function(d) {
        if (isNumber(d)) {
          return 'left'; //right
        }
        return 'left';
      })
        .text(function(d) {
        if (isNumber(d)) {
          var fmt = numFormat(d);
          return fmt
        }
        return d
      });

      function getIndex (header) {
        return data.headers.indexOf(header)    
      }

    });

  }

  function merge_sort(array,comparison)
  {
    if(array.length < 2)
      return array;
    var middle = Math.ceil(array.length/2);
    return merge(merge_sort(array.slice(0,middle),comparison),
        merge_sort(array.slice(middle),comparison),
        comparison);
  }


function merge(left,right,comparison)
{
  // console.log(left, right, comparison)
  var result = new Array();
  while((left.length > 0) && (right.length > 0))
  {
    if(comparison(left[0],right[0]) <= 0)
      result.push(left.shift());
    else
      result.push(right.shift());
  }
  while(left.length > 0)
    result.push(left.shift());
  while(right.length > 0)
    result.push(right.shift());
  return result;
}

  function compare(a, b) {
    if (a === null || b === null) return 0
    if (typeof a === 'string' && typeof b === 'string') {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    if (sortDesc === true) {
      return a > b ? -1 : a == b ? 0 : 1;        
    }
    return a > b ? 1 : a == b ? 0 : -1;
  }

  // check if it is a number

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.numFormat = function(_) {
    if (!arguments.length) return numFormat;
    numFormat = _;
    return chart;
  };
  chart.sortBy = function(_) {
    if (!arguments.length) return sortBy;
    sortBy = _;
    return chart;
  };
  chart.sortDesc = function(_) {
    if (!arguments.length) return sortDesc;
    sortDesc = _;
    return chart;
  };

  return chart;
};
// add support for amd
if (typeof window.define === "function" && window.define.amd) {
  window.define("Bridle", ['jquery', 'd3'], function() {
    return Bridle;
  });
// we're not using amd, then set up as 
// global var
} else {
  window.Bridle = Bridle;
}

})();