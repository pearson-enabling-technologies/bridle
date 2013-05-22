---
layout: default
title: Bridle v0.0.1
---

### What is bridle?
Bridle is a repository of charts built following the [reusable chart paradigm](bost.ocks.org/mike/chart/). The library is in its infancy, and still requires a bunch of work. We decided to still use d3 to invoke the chart, so that you can integrate them in your d3 workflow as seamlessly as possible:

<div id="line-chart"> </div>

### Usage
First of all you create a _chart generator_ by invoking the function of the chart you want to use:

{% highlight javascript %}
  var chart = Bridle.LineChart()
{% endhighlight %}

This call returns a _chart generator function_, much like `d3.axis` returns an axis generator. In order to customise the chart, you can call the different getters/setters of the function:

{% highlight javascript %}
  chart
    .width(900)
    .height(400)
    .title('Oranges are healthy')
    .yAxisTitle('Vitamin C content')
{% endhighlight %}

Once you have setup your generator, just use d3 to render the chart:

{% highlight javascript %}
  d3.select('#line-chart')
    .datum(data) // pass it your data object
    .call(chart) // and have d3 call your chart generator
{% endhighlight %}

For more information about why we use this paradigm, please refer to the article [Towards Reusable Charts](bost.ocks.org/mike/chart/) by d3.s creator, Michael Bostock.

### What's in a name?
At Pearson Technology we're building a data analytics project called Palomino. Palomino is a coat colour in horses, and since this library is part of the Palomino project, we chose something horse related. The idea is that the bridle is what helps you direct a horse and connects you to it.


<script type="text/javascript" src="{{ relative }}javascripts/lineChart.js">
</script>


