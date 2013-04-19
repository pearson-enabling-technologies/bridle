var lineData = [{
  'date': "2012-10-01",
  'trendingValue': 1000
}, {
  'date': "2012-09-01",
  'trendingValue': 900
}, {
  'date': "2012-08-01",
  'trendingValue': 1100
}, {
  'date': "2012-07-01",
  'trendingValue': 950
}, {
  'date': "2012-06-01",
  'trendingValue': 1050
}];

var time = 1000;
var line = lineChart()
  .duration(time)
  .title("Are oranges more popular than apples?")
  .yAxisTitle("Fruit Impact (Millions of Gallons of Juice)");
d3.select('#line-chart')
  .datum(lineData)
  .call(line);