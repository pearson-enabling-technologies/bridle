---
layout: example
title: Line Chart
---
# Line Chart With Custom Scale

<div class="chartContainer"> </div>

We show how you make a line chart with something other than a time series, i.e. another kind of continuous data. Note how we just use the `xScale()` function to change the scale from a time scale (by default) to a linear scale. This technique also works for the Stacked Area chart.

## Code
{% highlight javascript %}
// setup the chart generator
var line = Bridle.LineChart()
  .duration(1000)
  .width(800)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
  .margin({top:50, bottom:30, left:100, right:200})
  .xScale(d3.scale.linear())
  .formatterX(d3.format(".0d"))
  .xValue(function (d) {
    return d.z
  })
  .yValue(function (d) {
    return d.v
  })
  .nameValue(function (d) {
    return d.type
  });


d3.select('.chartContainer')
  .datum(lineData)
  .call(line);




{% endhighlight %}


## Data
{% highlight javascript %}
var lineData = [
  {
    "type": "appleseeds and stuff",
    "values": [
      { "z":  1, "v":  100*Math.random()},
      { "z":  2, "v":  100*Math.random()},
      { "z":  3, "v":  100*Math.random()},
      { "z":  4, "v":  100*Math.random()},
      { "z":  5, "v":  100*Math.random()},
      { "z":  6, "v":  100*Math.random()},
      { "z":  7, "v":  100*Math.random()},
      { "z":  8, "v":  100*Math.random()},
      { "z":  9, "v":  100*Math.random()},
      { "z": 10, "v":  100*Math.random()},
      { "z": 11, "v":  100*Math.random()},
      { "z": 12, "v":  100*Math.random()},
      { "z": 13, "v":  100*Math.random()},
      { "z": 14, "v":  100*Math.random()},
      { "z": 15, "v":  100*Math.random()},
      { "z": 16, "v":  100*Math.random()},
      { "z": 17, "v":  100*Math.random()},
      { "z": 18, "v":  100*Math.random()},
      { "z": 19, "v":  100*Math.random()}
    ]
  },
  {  
    "type": "oranges",
    "values": [
      { "z":  1, "v":  100*Math.random()},
      { "z":  2, "v":  100*Math.random()},
      { "z":  3, "v":  100*Math.random()},
      { "z":  4, "v":  100*Math.random()},
      { "z":  5, "v":  100*Math.random()},
      { "z":  6, "v":  100*Math.random()},
      { "z":  7, "v":  100*Math.random()},
      { "z":  8, "v":  100*Math.random()},
      { "z":  9, "v":  100*Math.random()},
      { "z": 10, "v":  100*Math.random()},
      { "z": 11, "v":  100*Math.random()},
      { "z": 12, "v":  100*Math.random()},
      { "z": 13, "v":  100*Math.random()},
      { "z": 14, "v":  100*Math.random()},
      { "z": 15, "v":  100*Math.random()},
      { "z": 16, "v":  100*Math.random()},
      { "z": 17, "v":  100*Math.random()},
      { "z": 18, "v":  100*Math.random()},
      { "z": 19, "v":  100*Math.random()}
    ]
  }
];



{% endhighlight %}


<script type="text/javascript">
var lineData = [
  {
    "type": "appleseeds and stuff",
    "values": [
      { "z":  1, "v":  100*Math.random()},
      { "z":  2, "v":  100*Math.random()},
      { "z":  3, "v":  100*Math.random()},
      { "z":  4, "v":  100*Math.random()},
      { "z":  5, "v":  100*Math.random()},
      { "z":  6, "v":  100*Math.random()},
      { "z":  7, "v":  100*Math.random()},
      { "z":  8, "v":  100*Math.random()},
      { "z":  9, "v":  100*Math.random()},
      { "z": 10, "v":  100*Math.random()},
      { "z": 11, "v":  100*Math.random()},
      { "z": 12, "v":  100*Math.random()},
      { "z": 13, "v":  100*Math.random()},
      { "z": 14, "v":  100*Math.random()},
      { "z": 15, "v":  100*Math.random()},
      { "z": 16, "v":  100*Math.random()},
      { "z": 17, "v":  100*Math.random()},
      { "z": 18, "v":  100*Math.random()},
      { "z": 19, "v":  100*Math.random()}
    ]
  },
  {  
    "type": "oranges",
    "values": [
      { "z":  1, "v":  100*Math.random()},
      { "z":  2, "v":  100*Math.random()},
      { "z":  3, "v":  100*Math.random()},
      { "z":  4, "v":  100*Math.random()},
      { "z":  5, "v":  100*Math.random()},
      { "z":  6, "v":  100*Math.random()},
      { "z":  7, "v":  100*Math.random()},
      { "z":  8, "v":  100*Math.random()},
      { "z":  9, "v":  100*Math.random()},
      { "z": 10, "v":  100*Math.random()},
      { "z": 11, "v":  100*Math.random()},
      { "z": 12, "v":  100*Math.random()},
      { "z": 13, "v":  100*Math.random()},
      { "z": 14, "v":  100*Math.random()},
      { "z": 15, "v":  100*Math.random()},
      { "z": 16, "v":  100*Math.random()},
      { "z": 17, "v":  100*Math.random()},
      { "z": 18, "v":  100*Math.random()},
      { "z": 19, "v":  100*Math.random()}
    ]
  }
];

var line = Bridle.LineChart()
  .duration(1000)
  .width(800)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
  .margin({top:50, bottom:30, left:100, right:200})
  .xScale(d3.scale.linear())
  .formatterX(d3.format(".0d"))
  .xValue(function (d) {
    return d.z
  })
  .yValue(function (d) {
    return d.v
  })
  .nameValue(function (d) {
    return d.type
  });


d3.select('.chartContainer')
  .datum(lineData)
  .call(line);


</script>