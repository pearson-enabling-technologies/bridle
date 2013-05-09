jQuery.fn.d3Click = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

jQuery.fn.d3Mouseover = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

jQuery.fn.d3Mouseout = function () {
  this.each(function (i, e) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouseout", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    e.dispatchEvent(evt);
  });
};

var lineData = [
  {
    "name": "apples",
    "values": [
      { "x": new Date('2012-01-01'), "y":  60},
      { "x": new Date('2012-01-02'), "y":  30},
      { "x": new Date('2012-01-03'), "y":  0},
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
var data2 = [ 
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
    "name": "kiwi",
    "values": [
      { "x": new Date('2012-01-01'), "y":  100},
      { "x": new Date('2012-01-02'), "y":  50},
      { "x": new Date('2012-01-03'), "y":  0},
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
    "name": "lychee",
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
    "name": "mango",
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
];
var lineData2 = lineData.concat(data2)

var containerID = "#line-chart"

function cleanup() {

  lineData = [
  {
    "name": "apples",
    "values": [
      { "x": new Date('2012-01-01'), "y":  60},
      { "x": new Date('2012-01-02'), "y":  30},
      { "x": new Date('2012-01-03'), "y":  0},
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
  data2 = [ 
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
      "name": "kiwi",
      "values": [
      { "x": new Date('2012-01-01'), "y":  100},
      { "x": new Date('2012-01-02'), "y":  50},
      { "x": new Date('2012-01-03'), "y":  0},
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
      "name": "lychee",
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
      "name": "mango",
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
  ];
  lineData2 = lineData.concat(data2)

  d3.select("svg")
    .remove();
  d3.selectAll(".nvtooltip")
    .remove();    

}

describe("line chart initial load", function () {

  beforeEach(function () {
    cleanup();

    var time = 0;
    this.line = lineChart()
      .duration(time)
      .width(800)
      .title("Apples or Oranges?")
      .yAxisTitle("Label your axes")
      .margin({top:50, bottom:30, left:100, right:200})
      .legend(legendBox().height(100));
    d3.select('#line-chart')
      .datum(lineData)
      .call(this.line);

  });

  it("has been initiated", function () {
    this.line.should.be.a('function')
  });

  it("allows get/set of option variables", function () {
    this.line.title().should.equal('Apples or Oranges?')
    this.line.width().should.equal(800)
    this.line.height().should.equal(400)
    this.line.margin().should.be.a('object')
  });

  it('creates svg', function () {
      var svgs = $(containerID+' svg');
      svgs.length.should.equal(2); // bar-chart + legend = 2
      var svg = d3.select(containerID).select("svg");
      parseInt(svg.attr("width")).should.equal(800)
      parseInt(svg.attr("height")).should.equal(400)

      var outerG = $('g', svgs[0])[0];
      d3.select(outerG).attr('transform').should.equal('translate(100,50)');

  });  

  it('has correct number of line series', function () {

      var lines = d3.selectAll('g.lines path');
      lines[0].length.should.equal(lineData.length)

  });

  it('has correct number of points series', function () {

      var series = d3.selectAll('g.seriespoints');
      series[0].length.should.equal(lineData.length)

    });

  it('has correct number of points in seriespoints', function () {

      var points = d3.select('g.seriespoints').selectAll("circle");
      points[0].length.should.equal(lineData[0].values.length)

    });


  it('points have correct height', function(done) {
    // 


    var points = d3.selectAll('g.seriespoints').selectAll("circle");
    console.log(points)
    var height1 = parseFloat(Math.round(points[0][0].getAttribute('cy')))
    var height2 = parseFloat(Math.round(points[0][1].getAttribute('cy')))
    var height3 = parseFloat(Math.round(points[0][2].getAttribute('cy')))
    console.log(height1, height2, height3)

    height1.should.equal(height2*2)
    height3.should.equal(0)
    //


    done()
  })


  it('has some xAxis labels', function () {

    // console.log(this.line.xAxis.ticks)

    var xAxisTicks = d3.selectAll('g.x.axis g.tick.major');

    var nthLabel = Math.ceil(200 / (this.line.width() / lineData[0].values.length));
 
    var expectedNumLabels = Math.round(lineData[0].values.length / nthLabel);

    // change this to a specific expected number if possible
    xAxisTicks[0].length.should.above(2)

  });    

  it('has correct number of legend labels', function () {

    var legendItems = d3.selectAll('g.legendItem');
    legendItems[0].length.should.equal(lineData.length)

  });    

  it('legend labels have text', function () {

    var legendText = d3.selectAll('g.legendItem text');
    legendText[0].length.should.equal(lineData.length)

  });

  it('legend circles have correct colour', function () {

    var colorFunc = this.line.colors()
    var legendCircle = d3.select('g.legendItem circle');
    legendCircle.attr("fill").should.equal(colorFunc(lineData[0].name));

  });

});



describe("line chart - adding data", function() {

  beforeEach(function() {
    cleanup();

    var time = 500;
    this.line = lineChart()
      .duration(time)
      .width(800)
      .title("Apples or Oranges?")
      .yAxisTitle("Label your axes")
      .margin({
      top: 50,
      bottom: 30,
      left: 100,
      right: 200
    })
      .legend(legendBox().height(100));
    d3.select(containerID)
      .datum(lineData)
      .call(this.line);

    d3.select(containerID)
      .datum(lineData2)
      .call(this.line);        

  });

  it('has correct number of line series', function () {

      var lines = d3.selectAll('g.lines path');
      lines[0].length.should.equal(lineData2.length)

  });

  it('has correct number of points series', function () {

      var series = d3.selectAll('g.seriespoints');
      series[0].length.should.equal(lineData2.length)

    });

  it('has correct number of points in seriespoints', function () {

      var points = d3.select('g.seriespoints').selectAll("circle");
      points[0].length.should.equal(lineData2[0].values.length)

    });


  it('has correct number of legend labels', function () {
      var legendItems = d3.selectAll('g.legendItem');
      legendItems[0].length.should.equal(lineData2.length)
  });    
});



describe("line chart - legend click (hiding series)", function() {


  beforeEach(function() {
    cleanup();

    var time = 500;
    this.line = lineChart()
      .duration(time)
      .width(800)
      .title("Apples or Oranges?")
      .yAxisTitle("Label your axes")
      .margin({
      top: 50,
      bottom: 30,
      left: 100,
      right: 200
    })
      .legend(legendBox().height(100));


    d3.select('#bar-chart')
      .datum(lineData2)
      .call(this.line);        

        // click on the third legend item - (kiwi)
    var legendItems = d3.selectAll('g.legendItem');
    $(legendItems[0][3]).d3Click();


  });

  it('triggers "disabled" on clicked data point', function () {
    lineData2[3].disabled.should.equal(true);
  });

  it('removes disabled series lines', function () {
    var series = d3.selectAll('g.lines path');
    series[0].length.should.equal(lineData2.length - 1)   
  });


  it('clicked legend circle has fill opacity 0', function () {

    var legendCircle = $('g.legendItem.disabled circle');

    parseInt(legendCircle.css('fill-opacity')).should.equal(0);
  });



});


describe("line chart - legend mouseover", function() {

  beforeEach(function() {
    cleanup();

    var time = 500;
    this.line = lineChart()
      .duration(time)
      .width(800)
      .title("Apples or Oranges?")
      .yAxisTitle("Label your axes")
      .margin({
      top: 50,
      bottom: 30,
      left: 100,
      right: 200
    })
      .legend(legendBox().height(100));


    d3.select('#bar-chart')
      .datum(lineData2)
      .call(this.line);        


    // mouseover on the third legend item - (kiwi)
    var legendItems = d3.selectAll('g.legendItem');
    $(legendItems[0][3]).d3Mouseover();


  });

  it('triggers "hover" on clicked data point', function () {
    lineData2[3].hover.should.equal(true);
    $('path.line.hover').length.should.equal(1)
  });


  it('increases opacity of line.hover', function () {
    var observedOpacity = $('path.line.hover').css('fill-opacity');
    parseInt(observedOpacity).should.equal(1);
  });

// mouseout reverts to 0.9 opacity
  it('line opacity reverts after mouseout', function () {
    // mouseout on the third legend item - (kiwi)
    $('path.line.hover').length.should.equal(1);
    var legendItems = d3.selectAll('g.legendItem');
    $(legendItems[0][3]).d3Mouseout();
    $('path.line').length.should.equal(lineData2.length);
    $('path.line.hover').length.should.equal(0);
  });
});





describe("line chart - point mouseover", function() {

  beforeEach(function() {
    cleanup();

    var time = 500;
    this.line = lineChart()
      .duration(time)
      .width(800)
      .title("Apples or Oranges?")
      .yAxisTitle("Label your axes")
      .margin({
        top: 50,
        bottom: 30,
        left: 100,
        right: 200
    })
      .legend(legendBox().height(100));


    d3.select(containerID)
      .datum(lineData2)
      .call(this.line);        


    // mouseover on the 4th point of 4th series - (kiwi 2012-01-04)    
    var points = d3.selectAll('g.seriespoints').selectAll("circle");

    $(points[3][3]).d3Mouseover();

  });

  it('tooltip div gets created', function () {
    var tooltip = d3.selectAll('.nvtooltip');    
    tooltip[0].length.should.equal(1);
  });

  it('tooltip shows correct text', function () {
    var tooltip = d3.select('.nvtooltip').html();    
    var yFormatted = d3.format(".02f")(lineData2[3].values[3].y)
    tooltip.should.equal('<h3>kiwi</h3><p><span class="value">[2012-01-04, '+ yFormatted +']</span></p>')
  });

  it('tooltip gets destroyed on mouseout', function () {
    var points = d3.selectAll('g.seriespoints').selectAll("circle");
    $(points[3][3]).d3Mouseout();
    // mouseout on the 4th rect of 4th series - (kiwi 2012-01-04)
    // delay 1 second so that tooltip remove transition completes
    setTimeout(function() { 
      var tooltip = d3.selectAll('.nvtooltip');
      tooltip[0].length.should.equal(0);
    }, 1000)

  });

});
















