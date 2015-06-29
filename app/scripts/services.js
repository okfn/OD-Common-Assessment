'use strict';
/* jshint devel:true */

var services = (function() {
  function getDataFromGoogleSpreadsheet(callback) {
    var URL = '1kOOvztwbY1RNm545RKG8Ua6bh2GgX-P_wFadPkdH2ig';
    Tabletop.init({
      key: URL,
      // proxy: "http://localhost:9000/",
      callback: function (data, tabletop){
        callback(tabletop.sheets('places').elements, tabletop.sheets('indicators').elements, tabletop.sheets('values').elements)
      },
      simpleSheet: false,
      prettyColumnNames: false
    });

    // $('#apply').on('click', function() {
    //     $('#filter-dropdown').trigger('hide.bs.dropdown');
    // });
  }

  function processedIndicators(data) {
    var all = {};
    var forScoring = [];
    var forGrouping = [];
    var visible = [];
    for (var i = 0; i < data.length; i++) {
      var id = data[i]['id'];
      all[id] = data[i]; // creating accessible key
      if(utilities.isTrue(data[i]['grouping'])) {
        forGrouping.push(id);
      }
      if(utilities.isTrue(data[i]['scoring'])) {
        forScoring.push(id);
        if(utilities.isTrue(data[i]['default'])) {
          visible.push(id);
          all[id]['visible'] = true;
        }
      }
    };
    return {
      all: all,
      scoring: forScoring,
      grouping: forGrouping,
      visible: visible // order is dictated by these items
    }
  }

  function visibleIndicator(indicators, indicatorId) {
    if(indicators.indexOf(indicatorId) != -1) {
      return true;
    }
    return false;
  }

  function processedPlaces(places, values, visibleIndicators) {
    var visible = visibleIndicators || [];
    // Map variable data into results
    places.map(function(place) {
      //place.values = [];
      place.score = 0;
      place.valuesMap = {};
      values.filter(function(value, index) {
        if (value.placeid === place.id) {
          place['valuesMap'][value['indicatorid']] = value;
          value.normalised = parseInt(value['normalised']) || 0;
          if(visibleIndicator(visible, value['indicatorid'])){
            // setting the initial score so that it not a computed score, so sorting works
            place.score += value.normalised;
          }
        }
        return true;
      });
    });
    return places
  }

  return {
    getData: getDataFromGoogleSpreadsheet,
    prepareIndicators: processedIndicators,
    preparePlaces: processedPlaces
  }
}());