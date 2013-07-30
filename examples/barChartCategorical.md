---
layout: example
title: Bar Chart
---
# Bar Chart
<div id="bar-chart-categorical" class="chartContainer"> </div>
A stacked bar chart for categorical data.

## Code
{% highlight javascript %}
// setup the chart
var bar = Bridle.BarChartCategorical()
  .duration(1000) 
  .mode("stacked")
  .width(700)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .margin({top:50, bottom:30, left:100, right:200})
  .legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
  .xValue(function (d) {return d.z})
  .yValue(function (d) {return d.v})
  .nameValue(function(d) {return d.type});

// create the chart
d3.select('#bar-chart')
  .datum(barData)
  .call(bar);



{% endhighlight %}


## Data
{% highlight javascript %}
var barData = [
  {
    "type": "apples",
    "values": [
      { "z": 'one', "v":  100*Math.random()},
      { "z": 'two', "v":  100*Math.random()},
      { "z": 'three', "v":  100*Math.random()},
      { "z": 'four', "v":  100*Math.random()},
      { "z": 'five', "v":  100*Math.random()}
    ]
  },
  {  
    "type": "oranges",
    "values": [
      { "z": 'one', "v":  100*Math.random()},
      { "z": 'two', "v":  100*Math.random()},
      { "z": 'three', "v":  100*Math.random()},
      { "z": 'four', "v":  100*Math.random()},
      { "z": 'five', "v":  100*Math.random()}
    ]
  }
];



{% endhighlight %}

<script type="text/javascript">
var barData = [
  {
    "type": "apples",
    "values": [
      { "z": 'one', "v":  100*Math.random()},
      { "z": 'two', "v":  100*Math.random()},
      { "z": 'three', "v":  100*Math.random()},
      { "z": 'four', "v":  100*Math.random()},
      { "z": 'five', "v":  100*Math.random()}
    ]
  },
  {  
    "type": "oranges",
    "values": [
      { "z": 'one', "v":  100*Math.random()},
      { "z": 'two', "v":  100*Math.random()},
      { "z": 'three', "v":  100*Math.random()},
      { "z": 'four', "v":  100*Math.random()},
      { "z": 'five', "v":  100*Math.random()}
    ]
  }
];

var bar = Bridle.BarChartCategorical()
  .duration(1000)
  .mode("stacked") 
  .width(700)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .margin({top:50, bottom:30, left:100, right:200})
  .legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
  .xValue(function (d) {return d.z})
  .yValue(function (d) {return d.v})
  .nameValue(function(d) {return d.type});
d3.select('#bar-chart-categorical')
  .datum(barData)
  .call(bar);
</script>