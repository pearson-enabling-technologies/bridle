var containerID = "#bar-chart";
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



var barData = function() {
  return [
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
};

var data2 = function() {
  return [ 
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
};

function makeData() {
  return barData().concat(data2());
}

function cleanup() {
  $('#switch').remove();

  d3.select("svg")
    .remove();
  d3.selectAll(".tooltip")
    .remove();  

  d3.selectAll("#switch")
    .remove();
  
  
} 

describe("Bar Chart", function() {



  describe("initial load", function() {


    beforeEach(function(done) {
      
      this.barData = barData();
      var time = 0;
      this.bar = Bridle.BarChart()
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

      d3.select(containerID)
        .datum(this.barData)
        .call(this.bar)
        .transition()
        .delay(time)
        .each("end", function() {
          done();
        })
    });

    afterEach(function() {
      cleanup();
    })

    it("has been initiated", function() {
      this.bar.should.be.a('function')
    });

    it("allows get/set of option variables", function() {
      this.bar.title().should.equal('Apples or Oranges?')
      this.bar.width().should.equal(800)
      this.bar.height().should.equal(400)
      this.bar.margin().should.be.a('object')
    });

    it('creates svg', function() {
      var svgs = $(containerID+' svg');
      svgs.length.should.equal(2); // bar-chart + legend = 2
      var svg = d3.select(containerID).select("svg");
      parseInt(svg.attr("width")).should.equal(800)
      parseInt(svg.attr("height")).should.equal(400)

      var outerG = $('g', svgs[0])[0];
      d3.select(outerG).attr('transform').should.equal('translate(100,50)');

    });

    it('has correct number of data series', function() {

      var layerRects = d3.selectAll('g.layerrects');
      layerRects[0].length.should.equal(this.barData.length)

    });

    it('has correct number of rects in series', function() {

      var rects = d3.select('g.layerrects').selectAll("rect");
      rects[0].length.should.equal(this.barData[0].values.length)

    });

    it('rects have correct height', function(done) {
      // 
      var layerRects = d3.selectAll('g.layerrects').selectAll("rect");
      var height1 = layerRects[0][0].getAttribute('height')
      var height2 = layerRects[0][1].getAttribute('height')
      var height3 = layerRects[0][2].getAttribute('height')

      Math.round(parseFloat(height1)).should.equal(Math.round(height2*2))
      Math.round(height3).should.equal(0)
      //
      done()
    })

    it('has correct number of xAxis labels', function() {

      var xAxisTicks = d3.selectAll('g.x.axis g.tick.major');

      var nthLabel = Math.ceil(200 / (this.bar.width() / this.barData[0].values.length));

      var expectedNumLabels = Math.round(this.barData[0].values.length / nthLabel);

      xAxisTicks[0].length.should.equal(expectedNumLabels)

    });

    it('has correct number of legend labels', function() {

      var legendItems = d3.selectAll('g.legendItem');
      legendItems[0].length.should.equal(this.barData.length)

    });

    it('legend labels have as many items as series we have', function() {

      var legendText = d3.selectAll('g.legendItem');
      legendText[0].length.should.equal(this.barData.length)

    });

    it('legend circles have correct colour', function() {

      var colorFunc = this.bar.colors()
      var legendCircle = d3.select('g.legendItem circle');
      legendCircle.attr("fill").should.equal(colorFunc(this.barData[0].name));

    });

  });

  describe("adding data", function() {


    beforeEach(function(done) {
    
      this.barData = barData();
      this.barData2 = makeData();
      var time = 0;
      this.bar = Bridle.BarChart()
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

      var that = this;

      d3.select(containerID)
        .datum(this.barData)
        .call(this.bar)
        .transition()
        .delay(time)
        .each("end", function() {
          d3.select(containerID)
            .datum(that.barData2)
            .call(that.bar)
            .transition()
            .delay(time)
            .each("end", function() {
              done();
            })
        });

    });

    afterEach(function () {
      cleanup();
    })


    it('has correct number of data series', function() {

      var layerRects = d3.selectAll('g.layerrects');
      layerRects[0].length.should.equal(this.barData2.length)

    });

    it('has correct number of rects in series', function() {

      var rects = d3.select('g.layerrects').selectAll("rect");
      rects[0].length.should.equal(this.barData2[0].values.length)

    });

    it('rects have correct height', function(done) {
      // 
      var layerRects = d3.selectAll('g.layerrects').selectAll("rect");
      var height1 = layerRects[3][0].getAttribute('height')
      var height2 = layerRects[3][1].getAttribute('height')
      var height3 = layerRects[3][2].getAttribute('height')

      Math.round(parseFloat(height1)).should.equal(Math.round(height2*2))
      Math.round(height3).should.equal(0)
      //
      done()
    })

    it('has correct number of legend labels', function() {

      var legendItems = d3.selectAll('g.legendItem');
      legendItems[0].length.should.equal(this.barData2.length)

    });
  });


  describe("legend click (hiding data)", function() {


    beforeEach(function(done) {
      this.barData = makeData();
      var time = 0;
      this.bar = Bridle.BarChart()
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


      d3.select(containerID)
        .datum(this.barData2)
        .call(this.bar)
        .transition()
        .delay(time)
        .each("end", function() {
          // click on the third legend item - (kiwi)
          var legendItems = d3.selectAll('g.legendItem');
          $(legendItems[0][3]).d3Click();
          done();        
        })



    });

    afterEach(function() {
      cleanup();
    })

    it('triggers "disabled" on clicked data point', function() {
      this.barData2[3].disabled.should.equal(true);
    });

    it('removes disabled series bars', function(done) {
        var layerRects = d3.selectAll('g.layerrects');
        layerRects[0].length.should.equal(this.barData2.length - 1)
        done()
    });


    // it('clicked legend circle has fill opacity 0', function() {

    //   var legendCircle = $('g.legendItem.disabled circle');
      
    //   parseInt(legendCircle.css('fill-opacity')).should.equal(0);
    // });



  });



  describe("legend mouseover", function() {

    beforeEach(function(done) {
      
      this.barData2 = makeData();
      var time = 0;
      this.bar = Bridle.BarChart()
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


      d3.select(containerID)
        .datum(this.barData2)
        .call(this.bar)
        .transition()
        .delay(time)
        .each("end", function() {
          // mouseover on the third legend item - (kiwi)
          var legendItems = d3.selectAll('g.legendItem');
          $(legendItems[0][3]).d3Mouseover();
          done();
        })



    });

    afterEach(function(done) {
      cleanup();
      done();
    });

    it('triggers "hover" on clicked data point', function() {
      this.barData2[3].hover.should.equal(true);
      $('g.layerrects.hover rect').length.should.equal(this.barData2[3].values.length)
    });


    it('increases opacity of series rects', function() {
      var observedOpacity = $('g.layerrects.hover rect').css('fill-opacity');
      parseInt(observedOpacity).should.equal(1);
    });

    // mouseout reverts to 0.9 opacity
    it('rect opacity reverts after mouseout', function() {
      // mouseout on the third legend item - (kiwi)
      var legendItems = d3.selectAll('g.legendItem');
      $(legendItems[0][3]).d3Mouseout();
      $('g.layerrects.hover rect').length.should.equal(0)
    });
  });


  describe("rect mouseover", function() {

    beforeEach(function(done) {

      this.barData2 = makeData();
      var time = 0;
      this.bar = Bridle.BarChart()
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
        .legend(Bridle.LegendBox().height(100));


      d3.select(containerID)
        .datum(this.barData2)
        .call(this.bar)
        .transition()
        .delay(time)
        .each("end", function() {

          // mouseover on the 4th rect of 4th series - (kiwi 2012-01-04)
          var layerrects = d3.selectAll('g.layerrects').selectAll("rect");
          $(layerrects[3][3]).d3Mouseover();
          done()

        })


    });

    afterEach(function() {
      cleanup();
    })

    it('tooltip div gets created', function() {
      var tooltip = d3.select('div.tooltip');
      tooltip[0].length.should.equal(1);
    });

    it('tooltip shows correct text', function() {
      var tooltip = d3.select('.tooltip').html();
      var yFormatted = d3.format(".02f")(this.barData2[3].values[3].y)
      tooltip.should.equal('<h3>kiwi</h3><p><span class="value">[2012-01-04, ' + yFormatted + ']</span></p>')
    });

    it('tooltip gets destroyed on mouseout', function() {
      var layerrects = d3.selectAll('g.layerrects').selectAll("rect");
      $(layerrects[3][3]).d3Mouseout();
      // mouseout on the 4th rect of 4th series - (kiwi 2012-01-04)
      // delay 1 second so that tooltip remove transition completes
      setTimeout(function() {
        var tooltip = d3.selectAll('.nvtooltip');
        tooltip[0].length.should.equal(0);
      }, 1000)

    });

  });

  describe("stacked to grouped", function() {

    beforeEach(function(done) {
      
      $("body").append('<div id="switch"><label><input type="radio" name="mode" value="grouped"> Grouped</label><label><input type="radio" name="mode" value="stacked" checked> Stacked</label></div>');  

      this.barData2 = makeData();
      var time = 100;
      this.bar = Bridle.BarChart()
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


      d3.select(containerID)
        .datum(this.barData2)
        .call(this.bar)
        .transition()
        .delay(time)
        .each("end", function() {
          $("input:radio:first").click();
          done();
        });

    });

    afterEach(function() {
      cleanup();
      d3.selectAll("#switch")
        .remove();
    })

    it('switches rects to grouped form', function(done) {
      setTimeout(function() {

        var layerRects = d3.selectAll('g.layerrects').selectAll("rect");


        layerRects.each(function(rect) {
          
          // var attrs = {
          //   w : this.getAttribute('width'),
          //   h : this.getAttribute('height'),
          //   y : this.getAttribute('y'),
          //   x : this.getAttribute('x')
          // } 

          // console.log(attrs, this)

          var hb = this.height.baseVal.value;
          var yb = this.y.baseVal.value;

          var sum = Math.round(hb + yb)

          sum.should.equal(320);

        })

        // console.log($(layerRects[3][3]))
        // console.log($(layerRects[3][3])[0])
        // console.log($(layerRects[3][3]).attr("y"))
        // console.log($(layerRects[3][3]).attr("height"))
        // console.log($(layerRects[3][3])[0].y.animVal.value)
        // console.log($(layerRects[3][3])[0].height.animVal.value)
        // console.log($(layerRects[3][3])[0].y.baseVal.value)
        // console.log($(layerRects[3][3])[0].height.baseVal.value)
      },1500);
        done();

    });

    it('rects have correct height', function(done) {
      // 
      var layerRects = d3.selectAll('g.layerrects').selectAll("rect");
      var height1 = layerRects[3][0].getAttribute('height')
      var height2 = layerRects[3][1].getAttribute('height')
      var height3 = layerRects[3][2].getAttribute('height')

      Math.round(parseFloat(height1)).should.equal(Math.round(height2*2))
      Math.round(height3).should.equal(0)
      //
      done()
    })


  });

});





































