(function () {


// create global namespace
var Bridle = window.Bridle || {};

// add support for amd
if (typeof window.define === "function" && window.define.amd) {
  window.define("Bridle", [], function() {
    return Bridle;
  });
}



