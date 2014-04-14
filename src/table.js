// Table generator
Bridle.Table = function() {

  var numFormat = d3.format('.3f');
  var margin = {
    top    : 0,
    bottom : 0,
    left   : 0,
    right  : 0
  };
  var sortBy = '';
  var sortDesc = false;
  var comparators = {};
  var accessors = {};
  var toggledColumn = false;

  function chart(selection) {
    selection.each(function(rawData) {
      var containerID = this;
      var data = $.extend(true, {}, rawData);

      // check whether a column has already been sorted twice, revert to unsorted data
      if (toggledColumn === true && sortBy === '') {
        toggledColumn = false;
        data = rawData;
      }

      // sort data if a column is specified
      // use merge sort algorithm because it is stable (preserves order) for equal values      
      if (sortBy !== '') {
        data.rows = mergeSort(data.rows, function(a, b) {
          var comparatorFn = comparators.hasOwnProperty(sortBy) ? comparators[sortBy] : compare;
          return comparatorFn(a[getIndex(sortBy)], b[getIndex(sortBy)]) * (sortDesc ? -1 : 1);
        });
      }

      // Select the table element, if it exists.
      var table = d3.select(containerID)
        // .append('table')
        // .attr('style', 'margin-left: 250px')

        .selectAll('table').data([data]);

      // Otherwise, create the skeletal chart.
      var tEnter = table.enter().append('table')
        .attr('class', 'table table-hover bridle')
        .attr('style', 'margin-top: ' + margin.top + 'px; margin-bottom: ' +
          margin.bottom + 'px; margin-left: ' + margin.left + 'px; margin-right: ' + margin.top + 'px');
      tEnter.append('thead').append('tr');
      tEnter.append('tbody');

      var headers = table.select('thead').select('tr').selectAll('th').data(function(d) {
        return d.headers;
      });
      // assume a list of headers
      headers.enter().append('th');

      // now be a body
      // add the rows
      var rows = table.select('tbody').selectAll('tr').data(function(d) {
        return d.rows;
      });

      rows.enter().append('tr');
      rows.exit().remove();

      var cells = rows.selectAll('td').data(function(d) {
        return d;
      });

      cells.enter()
        .append('td');

      table.selectAll('th')
        .style('text-align', function(d) {
          if (isNumber(d)) {
            return 'right';
          }
          return 'left';
        })
        .html(function(d) {
          return d;
        })
        .on('click', function(d, i) {
          if (toggledColumn === true) {
            d3.select(containerID).call(chart.sortBy(''));
          }
          else {
            // if column is already sorted, mark toggledColumn as true       
            if (i === getIndex(sortBy)) {
              sortDesc = !sortDesc;
              toggledColumn = true;
            }
            else {
              toggledColumn = false;
            }

            d3.select(containerID).call(chart.sortBy(d));
          }
        })
        .each(function(d, i) {
          if (i === getIndex(sortBy)) {
            if (sortDesc) {
              d3.select(this).append('span').attr('class', 'desc');
            } else {
              d3.select(this).append('span').attr('class', 'asc');
            }
          }
        });

      table.selectAll('td')
        .style('text-align', function(d) {
          if (isNumber(d)) {
            return 'left'; //right
          }
          return 'left';
        })
        .text(function(d) {
          if (d.type && accessors.hasOwnProperty(d.type)) {
            return accessors[d.type](d);
          }
          if (isNumber(d)) {
            return numFormat(d);
          }
          return d;
        });

      function getIndex(header) {
        return data.headers.indexOf(header);
      }

    });

  }

  function mergeSort(array, comparison) {
    if (array.length < 2) {
      return array;
    }
    var middle = Math.ceil(array.length / 2);
    return merge(mergeSort(array.slice(0, middle), comparison),
      mergeSort(array.slice(middle), comparison),
      comparison);
  }

  function merge(left, right, comparison) {
    var result = [];
    while ((left.length > 0) && (right.length > 0)) {
      if (comparison(left[0], right[0]) <= 0){
        result.push(left.shift());
      }
      else {
        result.push(right.shift());
      }
    }
    while (left.length > 0) {
      result.push(left.shift());
    }
    while (right.length > 0) {
      result.push(right.shift());
    }

    return result;
  }

  function compare(a, b) {
    if (a === null || b === null) {
      return 0;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    return a > b ? 1 : a === b ? 0 : -1;
  }

  // check if it is a number

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  chart.margin = function(_) {
    if (!arguments.length) {
      return margin;
    }
    margin = _;
    return chart;
  };

  chart.numFormat = function(_) {
    if (!arguments.length) {
      return numFormat;
    }
    numFormat = _;
    return chart;
  };
  chart.sortBy = function(_) {
    if (!arguments.length) {
      return sortBy;
    }
    sortBy = _;
    return chart;
  };
  chart.sortDesc = function(_) {
    if (!arguments.length) {
      return sortDesc;
    }
    sortDesc = _;
    return chart;
  };
  chart.comparators = function(_) {
    if (!arguments.length) {
      return comparators;
    }
    comparators = _;
    return chart;
  };
  chart.accessors = function(_) {
    if (!arguments.length) {
      return accessors;
    }
    accessors = _;
    return chart;
  };

  return chart;
};
