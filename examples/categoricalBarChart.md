---
layout: example
title: Categorical Bar Chart
---
# Bar Chart
<div id="bar-chart" class="chartContainer"> </div>
A stacked bar chart for data split in discrete categories, rather than a time series. 

## Code
{% highlight javascript %}
// setup the chart
var bar = Bridle.BarChartCategorical()
  .duration(1000) 
  .mode("stacked")
  .width(700)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .margin({top:50, bottom:100, left:100, right:200})
  .legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
  // this function trims out some of the data to just capture the
  // module number.
  .xValue(function (d) {
    var term = d.term;
    var match = term.match(/Module\s[\d]{1,2}/);
    if (match) {
      return match[0];
    } else {
      return term;
    }
  })
  .yValue(function (d) {return d.mean})
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
    "type": "MyGrammarLab Elementary",
    "values": [
      {
        "term": "Grammar for KET",
        "count": 9803,
        "total_count": 9789,
        "min": 0,
        "max": 100,
        "total": 756260,
        "mean": 77.25610378996834
      },
      {
        "term": "Module 1 Using nouns",
        "count": 81927,
        "total_count": 81786,
        "min": 0,
        "max": 100,
        "total": 6734610,
        "mean": 82.34428875357641
      },
      {
        "term": "Module 10 Conditionals",
        "count": 6691,
        "total_count": 6684,
        "min": 0,
        "max": 100,
        "total": 561040,
        "mean": 83.9377618192699
      },
      {
        "term": "Module 11 Word order and sentence patterns",
        "count": 7144,
        "total_count": 7134,
        "min": 0,
        "max": 100,
        "total": 578745,
        "mean": 81.12489486963835
      },
      {
        "term": "Module 12 Questions",
        "count": 10982,
        "total_count": 10954,
        "min": 0,
        "max": 100,
        "total": 906665,
        "mean": 82.77022092386343
      },
      {
        "term": "Module 13 Verbs with <i>-ing</i> forms and infinitives",
        "count": 5063,
        "total_count": 5058,
        "min": 0,
        "max": 100,
        "total": 400573,
        "mean": 79.19592724396995
      },
      {
        "term": "Module 14 Reported statements and indirect questions",
        "count": 5765,
        "total_count": 5759,
        "min": 0,
        "max": 100,
        "total": 459262,
        "mean": 79.74683104705679
      },
      {
        "term": "Module 15 Relative clauses",
        "count": 6038,
        "total_count": 6030,
        "min": 0,
        "max": 100,
        "total": 500589,
        "mean": 83.01641791044776
      },
      {
        "term": "Module 16 Linking words",
        "count": 4102,
        "total_count": 4097,
        "min": 0,
        "max": 100,
        "total": 335541,
        "mean": 81.89919453258481
      },
      {
        "term": "Module 17 Passive forms",
        "count": 7378,
        "total_count": 7370,
        "min": 0,
        "max": 100,
        "total": 621514,
        "mean": 84.33025780189959
      },
      {
        "term": "Module 18 Words that go together",
        "count": 8672,
        "total_count": 8663,
        "min": 0,
        "max": 100,
        "total": 662389,
        "mean": 76.46184924391089
      },
      {
        "term": "Module 19 Forming words",
        "count": 2664,
        "total_count": 2662,
        "min": 0,
        "max": 100,
        "total": 228936,
        "mean": 86.0015026296018
      },
      {
        "term": "Module 2 Pronouns and possessives",
        "count": 29494,
        "total_count": 29426,
        "min": 0,
        "max": 100,
        "total": 2322288,
        "mean": 78.91959491606063
      },
      {
        "term": "Module 20 Spoken English",
        "count": 580,
        "total_count": 577,
        "min": 0,
        "max": 100,
        "total": 49038,
        "mean": 84.98786828422877
      },
      {
        "term": "Module 3 Prepositions",
        "count": 23297,
        "total_count": 23259,
        "min": 0,
        "max": 100,
        "total": 1776791,
        "mean": 76.39154735801195
      },
      {
        "term": "Module 4 Adjectives and adverbs",
        "count": 25689,
        "total_count": 25637,
        "min": 0,
        "max": 100,
        "total": 2131980,
        "mean": 83.16027616335765
      },
      {
        "term": "Module 5 Present tenses",
        "count": 44001,
        "total_count": 43926,
        "min": 0,
        "max": 100,
        "total": 3651588,
        "mean": 83.13044666029231
      },
      {
        "term": "Module 6 Past tenses",
        "count": 23262,
        "total_count": 23212,
        "min": 0,
        "max": 100,
        "total": 1878941,
        "mean": 80.94696708599001
      },
      {
        "term": "Module 7 Present perfect",
        "count": 20863,
        "total_count": 20822,
        "min": 0,
        "max": 100,
        "total": 1667336,
        "mean": 80.07568917491115
      },
      {
        "term": "Module 8 Future forms",
        "count": 11452,
        "total_count": 11438,
        "min": 0,
        "max": 100,
        "total": 896918,
        "mean": 78.4156321035146
      },
      {
        "term": "Module 9 Modal verbs",
        "count": 15461,
        "total_count": 15436,
        "min": 0,
        "max": 100,
        "total": 1289699,
        "mean": 83.55137341280124
      }
    ]
  }
];



{% endhighlight %}

<script type="text/javascript">
var barData = [
  {
    "type": "MyGrammarLab Elementary",
    "values": [
      {
        "term": "Grammar for KET",
        "count": 9803,
        "total_count": 9789,
        "min": 0,
        "max": 100,
        "total": 756260,
        "mean": 77.25610378996834
      },
      {
        "term": "Module 1 Using nouns",
        "count": 81927,
        "total_count": 81786,
        "min": 0,
        "max": 100,
        "total": 6734610,
        "mean": 82.34428875357641
      },
      {
        "term": "Module 10 Conditionals",
        "count": 6691,
        "total_count": 6684,
        "min": 0,
        "max": 100,
        "total": 561040,
        "mean": 83.9377618192699
      },
      {
        "term": "Module 11 Word order and sentence patterns",
        "count": 7144,
        "total_count": 7134,
        "min": 0,
        "max": 100,
        "total": 578745,
        "mean": 81.12489486963835
      },
      {
        "term": "Module 12 Questions",
        "count": 10982,
        "total_count": 10954,
        "min": 0,
        "max": 100,
        "total": 906665,
        "mean": 82.77022092386343
      },
      {
        "term": "Module 13 Verbs with <i>-ing</i> forms and infinitives",
        "count": 5063,
        "total_count": 5058,
        "min": 0,
        "max": 100,
        "total": 400573,
        "mean": 79.19592724396995
      },
      {
        "term": "Module 14 Reported statements and indirect questions",
        "count": 5765,
        "total_count": 5759,
        "min": 0,
        "max": 100,
        "total": 459262,
        "mean": 79.74683104705679
      },
      {
        "term": "Module 15 Relative clauses",
        "count": 6038,
        "total_count": 6030,
        "min": 0,
        "max": 100,
        "total": 500589,
        "mean": 83.01641791044776
      },
      {
        "term": "Module 16 Linking words",
        "count": 4102,
        "total_count": 4097,
        "min": 0,
        "max": 100,
        "total": 335541,
        "mean": 81.89919453258481
      },
      {
        "term": "Module 17 Passive forms",
        "count": 7378,
        "total_count": 7370,
        "min": 0,
        "max": 100,
        "total": 621514,
        "mean": 84.33025780189959
      },
      {
        "term": "Module 18 Words that go together",
        "count": 8672,
        "total_count": 8663,
        "min": 0,
        "max": 100,
        "total": 662389,
        "mean": 76.46184924391089
      },
      {
        "term": "Module 19 Forming words",
        "count": 2664,
        "total_count": 2662,
        "min": 0,
        "max": 100,
        "total": 228936,
        "mean": 86.0015026296018
      },
      {
        "term": "Module 2 Pronouns and possessives",
        "count": 29494,
        "total_count": 29426,
        "min": 0,
        "max": 100,
        "total": 2322288,
        "mean": 78.91959491606063
      },
      {
        "term": "Module 20 Spoken English",
        "count": 580,
        "total_count": 577,
        "min": 0,
        "max": 100,
        "total": 49038,
        "mean": 84.98786828422877
      },
      {
        "term": "Module 3 Prepositions",
        "count": 23297,
        "total_count": 23259,
        "min": 0,
        "max": 100,
        "total": 1776791,
        "mean": 76.39154735801195
      },
      {
        "term": "Module 4 Adjectives and adverbs",
        "count": 25689,
        "total_count": 25637,
        "min": 0,
        "max": 100,
        "total": 2131980,
        "mean": 83.16027616335765
      },
      {
        "term": "Module 5 Present tenses",
        "count": 44001,
        "total_count": 43926,
        "min": 0,
        "max": 100,
        "total": 3651588,
        "mean": 83.13044666029231
      },
      {
        "term": "Module 6 Past tenses",
        "count": 23262,
        "total_count": 23212,
        "min": 0,
        "max": 100,
        "total": 1878941,
        "mean": 80.94696708599001
      },
      {
        "term": "Module 7 Present perfect",
        "count": 20863,
        "total_count": 20822,
        "min": 0,
        "max": 100,
        "total": 1667336,
        "mean": 80.07568917491115
      },
      {
        "term": "Module 8 Future forms",
        "count": 11452,
        "total_count": 11438,
        "min": 0,
        "max": 100,
        "total": 896918,
        "mean": 78.4156321035146
      },
      {
        "term": "Module 9 Modal verbs",
        "count": 15461,
        "total_count": 15436,
        "min": 0,
        "max": 100,
        "total": 1289699,
        "mean": 83.55137341280124
      }
    ]
  }
];

var bar = Bridle.BarChartCategorical()
  .duration(1000) 
  .mode("stacked")
  .width(700)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .margin({top:50, bottom:100, left:100, right:200})
  .legend(Bridle.LegendBox().height(100).nameAccessor(function(d) {return d.type}))
  .xValue(function (d) {
    var term = d.term;
    var match = term.match(/Module\s[\d]{1,2}/);
    if (match) {
      return match[0];
    } else {
      return term;
    }
  })
  .yValue(function (d) {return d.mean})
  .nameValue(function(d) {return d.type});

d3.select('#bar-chart')
  .datum(barData)
  .call(bar);
</script>