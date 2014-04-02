// The legend box
Bridle.LegendBox = function() {
  var margin = {
    top    : 5,
    bottom : 5,
    left   : 5,
    right  : 5
  };
  var height = 200;
  var width = 200;
  var colors = d3.scale.category10();
  var title = 'Chart Title';
  var duration = 1000;
  var nameAccessor = function(d) {
    return d.name;
  };
  var dispatch = d3.dispatch('legendClick', 'legendMouseover', 'legendMouseout');
  var numData;

  function chart(selection) {
    selection.each(function(data) {


      numData = data.length;
      // set up scaffolding
      var svg = d3.select(this).selectAll('svg').data([data]);
      var gEnter = svg.enter().append('svg').attr('class', 'bridle legend').append('g');
      gEnter.append('g').attr('class', 'legend');

      //update outer dimensions
      svg.attr('width', width)
        .attr('height', height);

      //update inner dimensions
      var g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // reassign the data to trigger addition / deletion
      var gLegendItem = g.select('.legend').selectAll('.legendItem')
        .data(function(d) {
          return d;
        });

      // add g for each legend item
      var gLegendItemEnter = gLegendItem.enter()
        .append('g')
        .attr('class', 'legendItem')
        .on('click', function(d, i) {
          dispatch.legendClick(d, i);
          gLegendItem.classed('disabled', function(d) {
            return d.disabled;
          });
        })
        .on('mouseover', function(d, i) {
          dispatch.legendMouseover(d, i);
        })
        .on('mouseout', function(d, i) {
          dispatch.legendMouseout(d, i);
        });

      // add circles and text elements
      gLegendItemEnter.append('circle')
        .attr('class', 'circle')
        .attr('cx', 0)
        .attr('cy', function() {
          // //console.log(d,i)
          return -0.25 + 'em';
        })
        .attr('r', 5)
        .attr('stroke-width', 1)
        .attr('stroke', function(d, i) {
          return colors(nameAccessor(d));
        })
        .attr('fill', function(d, i) {
          return colors(nameAccessor(d));
        });

      gLegendItemEnter.append('foreignObject')
        .attr('class', 'text')
        .attr('y', '-0.85em')
        .attr('x', 11)
        .attr('width', width - 11)
        .style('overflow', 'scroll')
        .append('xhtml:body')
        .append('p')
        .attr('class', 'bridle legend')
        .text(function(d) {
          return nameAccessor(d);
        })
        // we need to set the parentHeight of the 
        // foreignObject here!
        .each(function() {
          var h = this.getBoundingClientRect().height;
          d3.select(this.parentNode.parentNode).attr('height', h);
        });


      gLegendItem.classed('disabled', function(d) {
        return d.disabled;
      });

      gLegendItem.exit()
        .remove();

      var yPos = 5,
        newYpos = 0,
        xPos = 5,
        maxLength = 0;


      gLegendItem
        .attr('opacity', 0)
        .attr('transform', function() {

          if (length > maxLength) {
            maxLength = length;
          }
          yPos += newYpos;

          // if y has reached the vertical limit
          // if (yPos > height - margin.top - margin.bottom) {
          //   yPos = 5;
          //   xPos += width;
          // }

          // TO DO: handle horizonal limit cut-off remaining legendItems?
          // // if x has reached the horizontal limit
          // ...


          newYpos = this.getBoundingClientRect().height + 5; // a bit of padding

          return 'translate(' + xPos + ',' + yPos + ')';
        })
        .transition()
        .duration(duration)
        .attr('opacity', 1);

      // //position legend to the top left + margin
      // g.attr('transform', 'translate(' + (margin.left) + ',' + margin.top + ')');

      // height = margin.top + margin.bottom + ypos + 15; 


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

  chart.duration = function(_) {
    if (!arguments.length) {
      return duration;
    }
    duration = _;
    return chart;
  };

  chart.colors = function(_) {
    if (!arguments.length) {
      return colors;
    }
    colors = _;
    return chart;
  };

  chart.nameAccessor = function(_) {
    if (!arguments.length) {
      return nameAccessor;
    }
    nameAccessor = _;
    return chart;
  };
  chart.numData = function(_) {
    if (!arguments.length) {
      return numData;
    }
    numData = _;
    return chart;
  };

  return chart;
};
