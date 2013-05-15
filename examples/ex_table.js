var rawData = [
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

var headers = ['Fruit', 'Date', 'Sales']
var tableData = transform(headers, rawData)
// console.log(tableData)



var table = Bridle.Table()
  // .sortBy('Fruit')
  // .sortDesc(false)

d3.select('#table-chart').datum(tableData)
  .call(table)


setTimeout(function() { 

  var rawData2 =
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
  tableData2 = transform(headers, rawData2)
  console.log(tableData2)
  tableData.rows = tableData.rows.concat(tableData2.rows)

  console.log(tableData)
  d3.select('#table-chart')
    .datum(tableData)
    .call(table);

}, 1000);




function transform (headers, data) {
  var rows = data.map(function (d) {
    return d.values.map (function (e) {
      row = [d.type, e.z, e.v]
      return row
    })
  })
  var merged = [].concat.apply([], rows);
  var ret = {
    headers: headers,
    rows: merged
  }
  return ret;
}