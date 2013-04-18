function stackedChart() {

  var margin = {top:50, bottom:30, left:100, right:100};
  var height = 400;
  var width  = 1000;
  var xValue = function(d) { return d.date };
  var yValue = function(d) { return d.y };
  var style  = 'stack';
  var offset = 'zero';
  var order  = 'default';
  var interpolate = 'linear';
  var xScale = d3.time.scale.utc().nice();
  var yScale = d3.scale.linear().nice();
  var colors = d3.scale.category10();
  var xAxis  = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis  = d3.svg.axis().scale(yScale).orient("left");
  var area   = d3.svg.area().interpolate(interpolate).x(X).y0(Y0).y1(Y1);
  var title  = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;

  function chart (selection) {
    selection.each(function(data) {

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

      // x axis ticks
      xAxis.ticks(data[0].values.length)


      // set up the scaffolding
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
        .attr("text-anchor", "end");
      gEnter.append("svg:text").attr("class", "chartTitle label")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .attr("transform", "translate(" + (width - margin.left - margin.right + 20) /2 + "," + (-margin.top) + ")");
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
      var gArea = g.select('.areas').selectAll('.area')
          .data(function(d) { return d });

      var gAreaEnter = gArea.enter();
      // add paths
      gAreaEnter.append("path")
        .attr("data-legend",function(d) { return d.name})
        .attr("class", "area");

      gArea.exit()
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
          .data(function(d) { d.values.forEach(function(v) {v.name = d.name}); return d.values})      

      // update chilling points
      gPoints.selectAll('g.circle')
          .data(function(d) { d.values.forEach(function(v) {v.name = d.name}); return d.values})

      var circlesEnter = gCircles.enter().append("g").attr("class", "circle");

      circlesEnter.append('circle')
        .style("opacity", 0.1)
        .attr("class", "seriespoint")
        .attr('r', 5)
        .attr('cx', 0)
        .attr('cy', 0);

      // update the areas
      g.selectAll('path.area')
          .style("fill", function(d,i) {
            return colors(i);
          })
          .transition()
          .duration(duration)
          .attr("d", function(d) {
            return area(d.values);
          });
      
      // update the circles
      g.selectAll('g.circle')
          .transition()
          .duration(duration)
          .attr("transform", function(d) {
            return "translate(" + X(d) + ',' + Y1(d) + ')';
          } )

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
        .call(yAxis)
        
      g.select(".y.axis.label")
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
          g.append("text").text("10 times the radius of the cirlce").attr("dy", "25");
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