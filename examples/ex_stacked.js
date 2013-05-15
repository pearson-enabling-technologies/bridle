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
     var time = 1000;
    //console.log(stackedChart)




    var stacked = Bridle.StackedChart()
      .duration(time)
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


setTimeout(function() { 

var data2 =
 [
    {  
      "type": "pears",
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
      "type": "kiwi",
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
      "type": "lychee",
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
      "type": "mango",
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
  ];  

stackedData = stackedData.concat(data2)
d3.select('#stacked-chart')
  .datum(stackedData)
  .call(stacked);

}, 1000);