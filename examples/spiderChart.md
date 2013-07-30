---
layout: example
title: Spider Chart
---

# Spider Charts

<div id="spider-chart"> </div>

Click on the chart to refresh the data.

Spider charts are useful when displaying categorical data, and when used in small multiples, great for comparing multiple individuals, i.e. the performance of the students in a class.


## Code
{% highlight javascript %}
// generate some random data
var data = function() {
    return [[Math.random()*80 + 20, 'Math'], 
            [Math.random()*80 + 20, 'Physics'], 
            [Math.random()*80 + 20, 'Philosophy'], 
            [Math.random()*80 + 20, 'English'], 
            [Math.random()*80 + 20, 'History'], 
            [Math.random()*80 + 20, 'Computer Science']];
};

// Define the chart generator function
var chart = Bridle.spiderChart()
.width(800)
.height(600)
.title("Exam Results")
.subtitle("Exam results for Jane Doe")
.duration(1000);

// select the destination and draw the chart
d3.select('#spider-chart')
.datum(data()) // data is a function here, call it!
.call(chart);

// refresh the data when clicked

d3.select('#spider-chart')
    .on('click', function() {
    d3.select(this)
    .datum(data())
    .call(chart)
    })

{% endhighlight %}

<script>
var data = function() {
    return [[Math.random()*80 + 20, 'Math'], 
            [Math.random()*80 + 20, 'Physics'], 
            [Math.random()*80 + 20, 'Philosophy'], 
            [Math.random()*80 + 20, 'English'], 
            [Math.random()*80 + 20, 'History'], 
            [Math.random()*80 + 20, 'Computer Science']];
};

var chart = Bridle.spiderChart()
.width(800)
.height(600)
.title("Exam Results")
.subtitle("Exam results for Jane Doe")
.duration(1000);

d3.select('#spider-chart')
.datum(data())
.call(chart);

d3.select('#spider-chart')
    .on('click', function() {
    d3.select(this)
    .datum(data())
    .call(chart)
    })

</script>