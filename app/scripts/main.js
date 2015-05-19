'use strict';
/* jshint devel:true */

var app = (function() {
  function bindDropdownEvents() {
    $('#filter-dropdown ul').click(function(e) {
      console.log('stop');
      e.stopPropagation();
    });
  }

  function showInfo(data, tabletop) {
    // deconstruct data with tabletop
    var placesData = tabletop.sheets('places').elements;
    var indicatorsData = tabletop.sheets('indicators').elements;
    var valuesData = tabletop.sheets('values').elements;


    //console.log(placesData);
    console.log(indicatorsData);
    //console.log(valuesData);

    // Get visible indicators
    var indicatorsForScoring = {};
    var countInitialIndicators = 0
    indicatorsData.filter(function(indicator) {
      var visible = indicator.scoring === 'Y' && indicator.default === 'Y';
      if (visible) {
        countInitialIndicators += 1;
      }
      return visible;
    }).map(function(indicator) {
      return indicatorsForScoring[indicator.id] = true;
    });

    // Map variable and indicator data into results
    var resultsData = placesData.map(function(place) {
      place.values = [];
      valuesData.filter(function(value) {
        if (value['placeid'] === place.id) {
          value['indicatorVisible'] = indicatorsForScoring.hasOwnProperty(value['indicatorid']);
          value['normalised'] = parseInt(value['normalised']) || 0;
          place['values'].push(value);
        }

      });
      return place;
    });

    //  console.log(valuesData)
    console.log(placesData);
    //console.log(valuesData);

    // visible
    //console.log(indicatorsForScoring);

    var indicatorsFiltered = {};
    for (var i = 0; i < indicatorsData.length; i++) {
      indicatorsFiltered[indicatorsData[i]['id']] = indicatorsData[i];
    };

    //console.log(indicatorsFiltered);
    var ractive = new Ractive({
      el: '#table',
      template: '#template-table',
      data: {
        places: placesData,
        indicators: indicatorsFiltered,
        scoring: {
          scoringIndicators: indicatorsForScoring,
          numberOfVisibleIndicators: countInitialIndicators,
          score: function(values) {
            //console.log(values)
            var v = values.filter(function(value) {
                return value.indicatorVisible;
              })
              //console.log(v);
            var score = 0;
            for (var i = 0; i < v.length; i++) {
              var value = +v[i]['normalised'];
              score += value;
            };
            return score;
          }
        },
        sorting: {
          sort: utilities.sort,
          column: 'title',
          direction: 1
        },
        getIndicator: function(indicatorId, value) {
          return this.get('indicators')[indicatorId][value];
        }
      },
      computed: {

      }
    });

    ractive.on('sorting.sort', function(event, column) {
      this.set('sorting.column', column);
      this.set('sorting.direction', this.get('sorting.direction') * -1);
    });

    ractive.observe('scoring.scoringIndicators.*', function(newValue, oldValue, keypath) {
      console.log(newValue, oldValue, keypath);
    });

    // bindTable.set('data.numberOfVisibleIndicators', countInitialIndicators);
    //console.log(bindTable.get(numberOfVisibleIndicators))
    //this.set( 'items[*].completed', event.node.checked );
    //
    //         //$("#fullTable").html(ich.countries(cc));
    //  var bindFilter = new Ractive({
    //   el: "#filter",
    //   template: "#template-filter",
    //   data: { items: filterData }
    // });

    //bindDropdownEvents();
  }

  function runApp() {
    services.getData(showInfo);
  }

  return {
    start: runApp
  };
}());