'use strict';
/* jshint devel:true */

// Debug steps
// Get template to stop throwing error
    // get the values into the variable bit
// Debug actually issue with JS


var indicators = (function() {
  // filter indicators to make them easier to handle, visibility, default etc
  // todo: move to data processing
  function processedIndicators(data) {
    var indicatorData = {};
    var forScoring = [];
    var forGrouping = [];
    var visible = [];
    for (var i = 0; i < data.length; i++) {
      if(utilities.isTrue(data[i]['grouping'])) {
        forGrouping.push(data[i]['id']);
      }
      if(utilities.isTrue(data[i]['scoring'])) {
        forScoring.push(data[i]['id']);
        if(utilities.isTrue(data[i]['default'])) {
          visible.push(data[i]['id']);
          //data[i]['id'].visible = true;
        }
      }
      indicatorData[data[i]['id']] = data[i];
    };
    return {
      all: indicatorData,
      scoring: forScoring,
      grouping: forGrouping,
      // order is dictated by items in visible array
      visible: visible
    }
  }

  function visibleIndicator(indicators, indicatorId) {
    if(indicators.indexOf(indicatorId) != -1) {
      return true;
    }
    return false;
  }

// [[visible array]], each time with visibility
  function processedPlaces(places, values, visibleIndicators) {
    var visible = visibleIndicators || [];
    // Map variable data into results
    places.map(function(place) {
      //place.values = [];
      place.score = 0;
      place.valuesMap = {};
      values.filter(function(value) {
        if (value.placeid === place.id) {
          place['valuesMap'][value['indicatorid']] = value;
          value.normalised = parseInt(value['normalised']) || 0;
          if(visibleIndicator(visible, value['indicatorid'])){
            value.visible = true;
            place.score += value.normalised; // set initial score
          }
        }
        return true;
      });
    });
    return places
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
    indicators: processedIndicators,
    places: processedPlaces
  }
}());