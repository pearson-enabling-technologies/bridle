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
var line = lineChart()
  .duration(time)
  .width(800)
  .title("Apples or Oranges?")
  .yAxisTitle("Label your axes")
  .legend(legendBox().height(100).nameAccessor(function(d) {return d.type}))
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


d3.select('#line-chart')
  .datum(lineData)
  .call(line);

line.dispatch.on('showTooltip', function(e) {
  var offset = $('#line-chart').offset(), // { left: 0, top: 0 }
      left = e.pos[0] + offset.left,
      top = e.pos[1] + offset.top,
      formatterX = d3.time.format("%Y-%m-%d")
      formatterY = d3.format(".02f");

  var content = '<h3>' + e.series + '</h3>' +
                '<p>' +
                '<span class="value">[' + formatterX(e.x) + ', ' + formatterY(e.y) + ']</span>' +
                '</p>';

  nvtooltip.show([left, top], content);
});

line.dispatch.on('hideTooltip', function(e) {
  nvtooltip.cleanup();
});  

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

  
  lineData = lineData.concat(data2)

  d3.select('#line-chart')
    .datum(lineData)
    .call(line);

}, 1000);