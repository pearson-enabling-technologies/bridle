---
layout: example
title: Dual Axis Chart
---
# Dual Axis Chart

<div class="chartContainer"> </div>

A dual axis chart can show two different series on the same chart, with different units.

## Code
{% highlight javascript %}
var dualAxisChart = Bridle.DualAxisChart()
  .title('Sales of Apples in first half of January')
  .yLeftAxisTitle('Profitability %')
  .yRightAxisTitle('Units Sold')

d3.select('.chartContainer')
  .datum(chartData)
  .call(dualAxisChart);



{% endhighlight %}


           

## Data
{% highlight javascript %}
var chartData =
  {
    "type": "Apples are great fruits",
    "measures" : [
      "units",
      "profitability"
    ],
    "values": [
      { "z": '2012-01-01', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-02', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-03', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-04', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-05', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-06', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-07', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-08', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-09', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-10', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-11', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-12', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-13', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-14', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-15', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-16', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-17', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-18', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-19', "v":  100*Math.random(), "w": 1000*Math.random()}
    ]
  }
;

{% endhighlight %}


<script type='text/javascript'>
var chartData =
  {
    "type": "apples are apples they are a great fruits",
    "measures" : [
      "units",
      "profitability"
    ],
    "values": [
      { "z": '2012-01-01', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-02', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-03', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-04', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-05', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-06', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-07', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-08', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-09', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-10', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-11', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-12', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-13', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-14', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-15', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-16', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-17', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-18', "v":  100*Math.random(), "w": 1000*Math.random()},
      { "z": '2012-01-19', "v":  100*Math.random(), "w": 1000*Math.random()}
    ]
  }
;

var dualAxisChart = Bridle.DualAxisChart()
  .title('Sales of Apples in first half of January')
  .yLeftAxisTitle('Profitability %')
  .yRightAxisTitle('Units Sold')


d3.select('.chartContainer')
  .datum(chartData)
  .call(dualAxisChart);


</script>