'use strict';
/* jshint devel:true */

var services = (function() {

  function getDataFromGoogleSpreadsheet(callback) {
    var URL = '1kOOvztwbY1RNm545RKG8Ua6bh2GgX-P_wFadPkdH2ig';
    Tabletop.init({
      key: URL,
      //proxy: "http://localhost:9000/data/",
      callback: function (data, tabletop){
        callback(tabletop.sheets('places').elements, tabletop.sheets('indicators').elements, tabletop.sheets('values').elements)
      },
      simpleSheet: false,
      prettyColumnNames: false
    });
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

  function processedPlaces(data, values, visibleIndicators) {
    var places = data;
    var visible = visibleIndicators || [];
    // Map variable data into results
    places.map(function(place) {
      //place.values = [];
      place.score = 0;
      place.valuesMap = {};
      values.filter(function(value, index) {
        if (value.placeid === place.id) {
          place['valuesMap'][value['indicatorid']] = value;
        }
        return true;
      });
    });
    return places;
  }

  function calculateVisibleScores(data, visible) {
    // only calculates visible scores aka scores for scoring
    // display only the countries that have scores
    console.log(data, visible)
    var visible = visible ? visible : [];
    var groups = data;
    groups.map(function(group){
      // each value, check calculate
      group['places'] = group['places'].map(function(place) {
        var show = true;
        var score = 0;
        var values = place['valuesMap'];
        for(var key in values) {
          // check that indicators are scoring and visible
          if(show && visible.indexOf(values[key]['indicatorid']) > -1) {
            if(values[key]['normalised']) {
              // No indicator value does not mean 0.
              score += parseInt(values[key]['normalised']);
            } else {
              show = false;
            }
          }
        }
        place['first'] = false;
        place['score'] = score;
        place['show'] = show;
        return place;
      }).filter(function(place){
        return place.show;
      });
      // mark first visible item

      if(group && group['places'] && group['places'][0]) {
        console.log(groups)
        group['places'][0]['first'] = true;

      }
    });
    return groups;
  }

//todo: visibility of indicators
  function update(data, column, direction, grouping, groupingOrder) {
    var places = data;
    var groupingIndicator = grouping;
    var clustering = {};
    var grouping = [];

    if(groupingIndicator) {
      // cluster
      for (var place in places) {
        var groupValue = places[place].valuesMap[groupingIndicator];
        if(groupValue && groupValue['normalised']) {
          var groupSlug = utilities.slugify(groupValue['normalised']);
          if(!(groupSlug in clustering)) clustering[groupSlug] = { 'id': groupSlug, 'value': groupValue['normalised'], 'places':[] };
          clustering[groupSlug].places.push(places[place]);
        }
      }

      // sort grouping, dirty little hack for sorting order
      // comes from data source as 'apple' | 'orange' | 'pear'
      var sortOrder = groupingOrder ? groupingOrder.split('|') : Object.keys(clustering).sort(function(a, b) { return a < b; });

      for(var item in sortOrder) {
        var group = clustering[utilities.slugify(sortOrder[item])];
        group.places = utilities.sort(group.places, column, direction);
        grouping.push(group);
      }

    } else {
      grouping.push({ 'id': '', 'places': utilities.sort(places, column, direction)});
    }
    return grouping;
  }


  return {
    getData: getDataFromGoogleSpreadsheet,
    prepareIndicators: processedIndicators,
    preparePlaces: processedPlaces,
    calculateVisibleScores: calculateVisibleScores,
    updateGrouping: update
  }
}());