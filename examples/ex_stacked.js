      var stackedData = [
      {
        "name": "apples",
        "values": [
          { "x": new Date('2012-01-01'), "y":  100*Math.random()},
          { "x": new Date('2012-01-02'), "y":  100*Math.random()},
          { "x": new Date('2012-01-03'), "y":  100*Math.random()},
          { "x": new Date('2012-01-04'), "y":  100*Math.random()},
          { "x": new Date('2012-01-05'), "y":  100*Math.random()},
          { "x": new Date('2012-01-06'), "y":  100*Math.random()},
          { "x": new Date('2012-01-07'), "y":  100*Math.random()},
          { "x": new Date('2012-01-08'), "y":  100*Math.random()},
          { "x": new Date('2012-01-09'), "y":  100*Math.random()},
          { "x": new Date('2012-01-10'), "y":  100*Math.random()}
        ]
      },
      {  
        "name": "oranges",
        "values": [
          { "x": new Date('2012-01-01'), "y":  100*Math.random()},
          { "x": new Date('2012-01-02'), "y":  100*Math.random()},
          { "x": new Date('2012-01-03'), "y":  100*Math.random()},
          { "x": new Date('2012-01-04'), "y":  100*Math.random()},
          { "x": new Date('2012-01-05'), "y":  100*Math.random()},
          { "x": new Date('2012-01-06'), "y":  100*Math.random()},
          { "x": new Date('2012-01-07'), "y":  100*Math.random()},
          { "x": new Date('2012-01-08'), "y":  100*Math.random()},
          { "x": new Date('2012-01-09'), "y":  100*Math.random()},
          { "x": new Date('2012-01-10'), "y":  100*Math.random()}
        ]
      }
    ];
     var time = 1000;
    //console.log(stackedChart)




    var stacked = stackedChart()
      .duration(time)
      .width(700)
      .title("Are oranges more popular than apples?")
      .yAxisTitle("Fruit Impact (Millions of Gallons of Juice)");
    d3.select('#stacked-chart')
      .datum(stackedData)
      .call(stacked);



setTimeout(function() { 






      var data2 =
      {  
        "name": "pears",
        "values": [
          { "x": new Date('2012-01-01'), "y":  100*Math.random()},
          { "x": new Date('2012-01-02'), "y":  100*Math.random()},
          { "x": new Date('2012-01-03'), "y":  100*Math.random()},
          { "x": new Date('2012-01-04'), "y":  100*Math.random()},
          { "x": new Date('2012-01-05'), "y":  100*Math.random()},
          { "x": new Date('2012-01-06'), "y":  100*Math.random()},
          { "x": new Date('2012-01-07'), "y":  100*Math.random()},
          { "x": new Date('2012-01-08'), "y":  100*Math.random()},
          { "x": new Date('2012-01-09'), "y":  100*Math.random()},
          { "x": new Date('2012-01-10'), "y":  100*Math.random()}
        ]
      };  
      stackedData.push(data2)
d3.select('#stacked-chart')
  .datum(stackedData)
  .call(stacked);

}, 1000);