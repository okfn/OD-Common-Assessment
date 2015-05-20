'use strict';
/* jshint devel:true */

var indicators = (function() {
  function remove(indicatorId) {
    var visible = this.get('scoring.visibleIndicators');
    var index = visible.indexOf(indicatorId);
    if (index > -1) {
        visible.splice(index, 1);
    }
    console.log(visible)
    return visible;
  }

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

  return {
    remove: remove,
    processed: processedIndicators
  }
}());