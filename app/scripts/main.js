'use strict';
/* jshint devel:true */

var app = (function() {
  function bindDropdownEvents() {
    $('#filter-dropdown ul').click(function(e) {
      console.log('stop');
      e.stopPropagation();
    });
  }

// TODO: break out into modules
  function showInfo(data, tabletop) {
    // deconstruct data with tabletop
    var placesData = tabletop.sheets('places').elements;
    var indicatorsData = tabletop.sheets('indicators').elements;
    var valuesData = tabletop.sheets('values').elements;


    //console.log(placesData);
    console.log(indicatorsData);
    //console.log(valuesData);

    // Map variable and indicator data into results
    var resultsData = placesData.map(function(place) {
      place.values = [];
      valuesData.filter(function(value) {
        if (value['placeid'] === place.id) {
         // value['indicatorVisible'] = indicatorsForScoring.hasOwnProperty(value['indicatorid']);
          value['normalised'] = parseInt(value['normalised']) || 0;
          place['values'].push(value);
        }

      });
      return place;
    });

    //  console.log(valuesData)
    //console.log(placesData);
    //console.log(valuesData);

    // filter indicators to make them easier to handle, visibility, default etc
    var indicatorsFiltered = {};
    var forScoring = {};
    var count = 0;

    for (var i = 0; i < indicatorsData.length; i++) {
      if(utilities.isTrue(indicatorsData[i]['scoring'])) {
        // set initial state for observable scores
        forScoring[indicatorsData[i]['id']] = {value: false};
        if(utilities.isTrue(indicatorsData[i]['default'])) {
          count+= 1;
          forScoring[indicatorsData[i]['id']]['value'] = true;
        }
      }
      indicatorsFiltered[indicatorsData[i]['id']] = indicatorsData[i];
    };

    var Component = Ractive.extend({
      isolated: false,
      template: '#template-filter'
    });

    var ractive = new Ractive({
      el: '#table',
      template: '#template-table',
      data: {
        places: placesData,
        indicators: indicatorsFiltered,
        scoring: {
          scoringIndicators: forScoring,
          visibleIndicators: count,
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
        },
        isVisible: function(indicatorId) {
          return this.get('scoring.scoringIndicators')[indicatorId]['value'];
        }
      },
      computed: {

      },
      components: { Component: Component }
    });

    console.log(forScoring);
    console.log(indicatorsFiltered);

    // sorting observers
    ractive.on('sorting.sort', function(event, column) {
      this.set('sorting.column', column);
      this.set('sorting.direction', this.get('sorting.direction') * -1);
    });


    // visible indicators
    var observer = ractive.observe( 'scoring.scoringIndicators.*', function ( newValue, oldValue, keypath ) {
     // console.log( keypath + ' changed to ' );
      //console.log(newValue);
      //console.log(oldValue)
    });


    //ractive.set( 'scoring.scoringIndicators.odi-score', true )
    // ractive.observe('scoring.scoringIndicators.*', function(newValue, oldValue, keypath) {
    //   console.log(newValue, oldValue, keypath);
    // });

    //this.set( 'items[*].completed', event.node.checked );

    //bindDropdownEvents();
  }

  function runApp() {
    services.getData(showInfo);
  }

  return {
    start: runApp
  };
}());