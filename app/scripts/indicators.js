'use strict';
/* jshint devel:true */

var indicators = (function() {
  // filter indicators to make them easier to handle, visibility, default etc
  // todo: move to data processing
  function processedIndicators(data) {
    var indicatorData = {};
    var forScoring = [];
    var visible = [];
    for (var i = 0; i < data.length; i++) {
      if(utilities.isTrue(data[i]['scoring'])) {
        forScoring.push(data[i]['id']);
        if(utilities.isTrue(data[i]['default'])) {
          visible.push(data[i]['id']);
        }
      }
      indicatorData[data[i]['id']] = data[i];
    };
    return {
      all: indicatorData,
      scoring: forScoring,
      visible: visible
    }
  }

  function calculate(values) {
    //console.log(values)
    //var v = this.get('indicators.processed.visible');
    var score = 0;
    // for (var i = 0; i < v.length; i++) {
    //   var value = +v[i]['normalised'];
    //   score += value;
    // };
    return score;
  }

  return {
    calculate: calculate,
    processed: processedIndicators
  }
}());