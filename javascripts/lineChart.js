// generate some random data
var startt = 1325376000000;
var daysms = 86400000;

// random data generator.

randomData = function(length) {
  return Array.apply(null, {length: length}).map(function(d, i) {
    return {
      "z" : new Date(startt + (daysms*i)).toISOString(),
      "v" : 100*Math.random()
    }
  });
}

var series = ['apples', 'oranges', 'pears', 'kiwi']

var lineData = series.map(function(d) {
  return {
    'type' : d,
    'values' : randomData(8)
  };
});


console.log (lineData)


var line = Bridle.LineChart()
  .duration(1000)
  .width(800)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
  .margin({top:50, bottom:30, left:100, right:150})
  .xValue(function (d) {
    return new Date(Date.parse(d.z)) // parse the date
  })
  .yValue(function (d) {
    return d.v
  })
  .nameValue(function (d) {
    return d.type
  });


d3.select('#line-chart')
  .datum(lineData)
  .call(line);