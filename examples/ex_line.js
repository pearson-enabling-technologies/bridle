// var lineData = [{
//   'date': "2012-10-01",
//   'y': 1000
// }, {
//   'date': "2012-09-01",
//   'y': 900
// }, {
//   'date': "2012-08-01",
//   'y': 1100
// }, {
//   'date': "2012-07-01",
//   'y': 950
// }, {
//   'date': "2012-06-01",
//   'y': 1050
// }];
      var lineData = [
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
var line = lineChart()
  .duration(time)
  .width(700)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes");
d3.select('#line-chart')
  .datum(lineData)
  .call(line);


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
  
  lineData.push(data2)

  d3.select('#line-chart')
    .datum(lineData)
    .call(line);

}, 1000);