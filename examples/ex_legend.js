var data = [
  {
    "name": "apples"
  },
  {  
    "name": "oranges"
  },
  {
    "name": "pears"
  }
];




var time = 1000;
var legend = legendBox()
  .duration(time)
  .width(600)
  .height(100)
  .colors(d3.scale.category20());
d3.select('#legend-box')
  .datum(data)
  .call(legend);


setTimeout(function() { 

  var data2 = [
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
  
  data = data.concat(data, data2)
  d3.select('#legend-box')
    .datum(data)
    .call(legend);

}, 1000);