
var barData = [
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
      { "x": new Date('2012-01-10'), "y":  100*Math.random()},
      { "x": new Date('2012-01-11'), "y":  100*Math.random()},
      { "x": new Date('2012-01-12'), "y":  100*Math.random()},
      { "x": new Date('2012-01-13'), "y":  100*Math.random()},
      { "x": new Date('2012-01-14'), "y":  100*Math.random()},
      { "x": new Date('2012-01-15'), "y":  100*Math.random()},
      { "x": new Date('2012-01-16'), "y":  100*Math.random()},
      { "x": new Date('2012-01-17'), "y":  100*Math.random()},
      { "x": new Date('2012-01-18'), "y":  100*Math.random()},
      { "x": new Date('2012-01-19'), "y":  100*Math.random()}
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
      { "x": new Date('2012-01-10'), "y":  100*Math.random()},
      { "x": new Date('2012-01-11'), "y":  100*Math.random()},
      { "x": new Date('2012-01-12'), "y":  100*Math.random()},
      { "x": new Date('2012-01-13'), "y":  100*Math.random()},
      { "x": new Date('2012-01-14'), "y":  100*Math.random()},
      { "x": new Date('2012-01-15'), "y":  100*Math.random()},
      { "x": new Date('2012-01-16'), "y":  100*Math.random()},
      { "x": new Date('2012-01-17'), "y":  100*Math.random()},
      { "x": new Date('2012-01-18'), "y":  100*Math.random()},
      { "x": new Date('2012-01-19'), "y":  100*Math.random()}
    ]
  }
];

describe("bar chart", function () {

    beforeEach(function () {

    var time = 0;
    this.bar = barChart()
      .duration(time)
      .width(800)
      .title("Apples or Oranges?")
      .yAxisTitle("Label your axes")
      .margin({top:50, bottom:30, left:100, right:200})
      .legend(legendBox().height(100));
    d3.select('#bar-chart')
      .datum(barData)
      .call(bar);

    });

    it("works", function () {
        //expect(this.bar.get('tracks').length).toEqual(2);
        expect((2+2).toEqual(4));
    });

});
