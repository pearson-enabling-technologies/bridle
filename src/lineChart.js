function lineChart() {

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
    return d.date
  };
  var yValue = function(d) {
    return d.y
  };
  var title = 'Chart Title';
  var yAxisTitle = 'Axis Title';
  var duration = 1000;
  var xScale = d3.time.scale.utc().nice();
  var yScale = d3.scale.linear().nice();
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  function getDate(d) {
    var dt = new Date(d.date);
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }

  function showData(obj, d) {
    var coord = d3.mouse(obj);
    var infobox = d3.select(".infobox");
    // now we just position the infobox roughly where our mouse is
    infobox.style("left", (coord[0] + 100) + "px");
    infobox.style("top", (coord[1] - 175) + "px");
    $(".infobox").html(d);
    $(".infobox").show();
  }

  function hideData() {
    $(".infobox").hide();
  }


  function chart(selection) {
    selection.each(function(data) {



      // make sure the data is sorted
      data.sort(function(a, b) {
        var d1 = getDate(a);
        var d2 = getDate(b);
        if (d1 == d2) return 0;
        if (d1 > d2) return 1;
        return -1;
      });



      // get max and min dates - this assumes data is sorted
      var minDate = getDate(data[0]),
        maxDate = getDate(data[data.length - 1]);


      xScale.domain([minDate, maxDate]).range([0, width - margin.left - margin.right]);


      // X scale will fit all values from data[] within pixels 0-w
      //var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
      // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
      yScale.domain([0, d3.max(data, function(d) {
        return d.trendingValue;
      })]).range([height - margin.top - margin.bottom, 0]);

      // create a line function that can convert data[] into x and y points
      var line = d3.svg.line()
        // assign the X function to plot our line as we wish
        .x(function(d, i) {
          // return the X coordinate where we want to plot this datapoint
          return xScale(getDate(d)); //x(i);
        })
          .y(function(d) {
          // return the Y coordinate where we want to plot this datapoint
          return yScale(d.trendingValue);
        });


      function xx(e) {
        return xScale(getDate(e));
      };

      function yy(e) {
        return yScale(e.trendingValue);
      };


      $("#line-chart").append("<p><small><em>Please move the mouse over data points to see details.</em></small></p>");

      // Add an SVG element with the desired dimensions and margin.
      var graph = d3.select(this).append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // create xAxis
      xAxis.ticks(d3.time.months, 1).tickSize(- height + margin.top + margin.bottom).tickSubdivide(true);
      // Add the x-axis.
      graph.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
        .call(xAxis);

      // create left yAxis
      yAxis.ticks(10); //.tickFormat(formalLabel);
      // Add the y-axis to the left
      graph.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(-25,0)")
        .call(yAxis);

      // Add the line by appending an svg:path element with the data line we created above
      // do this AFTER the axes above so that the line is above the tick-lines
      graph.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("fill", "steelblue")
        .attr("r", 5)
        .attr("cx", xx)
        .attr("cy", yy)
        .on("mouseover", function(d) {
        showData(this, d.trendingValue);
      })
        .on("mouseout", function() {
        hideData();
      });

      graph.append("svg:path").attr("d", line(data));
      graph.append("svg:text")
        .attr("x", -200)
        .attr("y", -90)
        .attr("dy", ".1em")
        .attr("transform", "rotate(-90)")
        .text("Trending Value");


      $("#line-chart").append("<div class='infobox' style='display:none;'>Test</div>");
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