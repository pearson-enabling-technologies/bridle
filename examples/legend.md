---
layout: example
title: Legend
---

# Legend 

<div id="legend-box"> </div>

This shows how to use the legend module.

## Code
{% highlight javascript %}
// setup legend
var legend = legendBox()
  .duration(1000)
  .width(600)
  .height(100)
  .colors(d3.scale.category20());

// draw legend
d3.select('#legend-box')
  .datum(data)
  .call(legend);



{% endhighlight %}



## Data
{% highlight javascript %}
var data = [
    {  
      "name": "bananas"
    },
    {
      "name": "kiwis"
    },
    {  
      "name": "guavas"
    },
    {
      "name": "mangos"
    },
    {  
      "name": "grapefruit"
    },
    {
      "name": "pears"
    },
    {  
      "name": "bananas"
    },
    {
      "name": "kiwis"
    },
    {  
      "name": "guavas"
    }
  ];



{% endhighlight %}

<script type="text/javascript">
var data = [
    {  
      "name": "bananas"
    },
    {
      "name": "kiwis"
    },
    {  
      "name": "guavas"
    },
    {
      "name": "mangos"
    },
    {  
      "name": "grapefruit"
    },
    {
      "name": "pears"
    },
    {  
      "name": "bananas"
    },
    {
      "name": "kiwis"
    },
    {  
      "name": "guavas"
    }
  ];


var legend = Bridle.LegendBox()
  .duration(1000)
  .width(600)
  .height(100)
  .colors(d3.scale.category20());

d3.select('#legend-box')
  .datum(data)
  .call(legend);
</script>