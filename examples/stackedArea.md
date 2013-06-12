---
layout: example
title: Stacked Area Chart
---

# Stacked Area Chart

<div id="stacked-chart"> </div>

A stacked area chart, useful for showing categorical data whilst giving an impression of a full total

## Code
{% highlight javascript %}
// setup the chart
var stacked = Bridle.StackedChart()
  .duration(1000)
  .width(800)
  .title("Are oranges more popular than apples?")
  .yAxisTitle("Fruit Impact (Millions of Gallons of Juice)")
.legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
.margin({top:50, bottom:30, left:100, right:200})
.xValue(function (d) {
  return new Date (d.z)
})
.yValue(function (d) {
  return d.v
})
.nameValue(function (d) {
  return d.type
});

// render the chart
d3.select('#stacked-chart')
  .datum(stackedData)
  .call(stacked);


  
{% endhighlight %}

## Data
{% highlight javascript %}
var stackedData = [
  {
    "type": "apples",
    "values": [
      { "z": '2012-01-01', "v":  100*Math.random()},
      { "z": '2012-01-02', "v":  100*Math.random()},
      { "z": '2012-01-03', "v":  100*Math.random()},
      { "z": '2012-01-04', "v":  100*Math.random()},
      { "z": '2012-01-05', "v":  100*Math.random()},
      { "z": '2012-01-06', "v":  100*Math.random()},
      { "z": '2012-01-07', "v":  100*Math.random()},
      { "z": '2012-01-08', "v":  100*Math.random()},
      { "z": '2012-01-09', "v":  100*Math.random()},
      { "z": '2012-01-10', "v":  100*Math.random()},
      { "z": '2012-01-11', "v":  100*Math.random()},
      { "z": '2012-01-12', "v":  100*Math.random()},
      { "z": '2012-01-13', "v":  100*Math.random()},
      { "z": '2012-01-14', "v":  100*Math.random()},
      { "z": '2012-01-15', "v":  100*Math.random()},
      { "z": '2012-01-16', "v":  100*Math.random()},
      { "z": '2012-01-17', "v":  100*Math.random()},
      { "z": '2012-01-18', "v":  100*Math.random()},
      { "z": '2012-01-19', "v":  100*Math.random()}
    ]
  },
  {  
    "type": "oranges",
    "values": [
      { "z": '2012-01-01', "v":  100*Math.random()},
      { "z": '2012-01-02', "v":  100*Math.random()},
      { "z": '2012-01-03', "v":  100*Math.random()},
      { "z": '2012-01-04', "v":  100*Math.random()},
      { "z": '2012-01-05', "v":  100*Math.random()},
      { "z": '2012-01-06', "v":  100*Math.random()},
      { "z": '2012-01-07', "v":  100*Math.random()},
      { "z": '2012-01-08', "v":  100*Math.random()},
      { "z": '2012-01-09', "v":  100*Math.random()},
      { "z": '2012-01-10', "v":  100*Math.random()},
      { "z": '2012-01-11', "v":  100*Math.random()},
      { "z": '2012-01-12', "v":  100*Math.random()},
      { "z": '2012-01-13', "v":  100*Math.random()},
      { "z": '2012-01-14', "v":  100*Math.random()},
      { "z": '2012-01-15', "v":  100*Math.random()},
      { "z": '2012-01-16', "v":  100*Math.random()},
      { "z": '2012-01-17', "v":  100*Math.random()},
      { "z": '2012-01-18', "v":  100*Math.random()},
      { "z": '2012-01-19', "v":  100*Math.random()}
    ]
  }
];



{% endhighlight %}

<script type="text/javascript">
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

var stackedData = series.map(function(d) {
  return {
    'type' : d,
    'values' : randomData(10)
  };
});


var stacked = Bridle.StackedChart()
  .duration(1000)
  .width(800)
  .title("Are oranges more popular than apples?")
  .yAxisTitle("Fruit Impact (Millions of Gallons of Juice)")
.legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
.margin({top:50, bottom:30, left:100, right:200})
.xValue(function (d) {
  return new Date (d.z)
})
.yValue(function (d) {
  return d.v
})
.nameValue(function (d) {
  return d.type
});

d3.select('#stacked-chart')
  .datum(stackedData)
  .call(stacked);

setInterval(function() {
  // we add a new data point and remove
  // the first one
  stackedData.forEach(function(series) {
    //series.values.shift();
    addRandomRow(series.values);
  });

 d3.select('#stacked-chart')
  .datum(stackedData)
  .call(stacked);

}, 5000)


</script>