// generate some random data
var startt = 1325376000000;
var daysms = 86400000;

// random data generator.

randomData = function(length) {
  return Array.apply(null, {length: length}).map(function(d, i) {
    return {
      "z" : new Date(startt + (daysms*i)).toISOString(),
      "v" : 50*Math.abs(Math.sin(startt + (daysms*i) + Math.random())/2)
    }
  });
}

// adds another row to the data
addRandomRow = function(data) {
  time = new Date(data[data.length-1].z).getTime()
  data.push({
      "z" : new Date(time + (daysms)).toISOString(),
      "v" : 50*Math.abs(Math.sin(time + (daysms)+ Math.random())/2)
    });
}

var series = ['apples', 'oranges', 'pears', 'kiwi']

var lineData = series.map(function(d) {
  return {
    'type' : d,
    'values' : randomData(10)
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


setInterval(function() {
  // we add a new data point and remove
  // the first one
  lineData.forEach(function(series) {
    series.values.shift();
    addRandomRow(series.values);
  })

  d3.select('#line-chart')
  .datum(lineData)
  .call(line);

}, 5000)
