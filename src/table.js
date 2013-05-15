Bridle.Table = function() {

  var format = d3.format('.3f');
  var margin = {
    top: 50,
    bottom: 100,
    left: 100,
    right: 100
  };
  var height = 400;
  var width = 1000;

  function chart(selection) {
    selection.each(function(data) {

      // Select the table element, if it exists.
      var table = d3.select(this)
      // .append("table")
      // .attr("style", "margin-left: 250px")

      .selectAll("table").data([data]);

      // Otherwise, create the skeletal chart.
      var tEnter = table.enter().append("table")
        .attr("class", "table table-hover")
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

      table.selectAll('td')
        .style('text-align', function(d) {
        if (isNumber(d)) {
          return 'right';
        }
        return 'left';
      })
        .text(function(d) {
        if (isNumber(d)) {
          console.log("it's a number:", d, format(d))
          var fmt = format(d);
          return fmt
        }
        return d
      });


    });
  }

  // check if it is a number

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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

  return chart;
}