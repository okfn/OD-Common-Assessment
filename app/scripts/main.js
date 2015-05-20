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


    var Filter = Ractive.extend({
      isolated: false,
      template: '#template-filter'
    });
    // var Score = Ractive.extend({
    //   template: '{{}}',
    //   computed: { area: '${width} * ${height}' }
    // });

    var ractive = new Ractive({
      el: '#table',
      template: '#template-table',
      data: {
        scores: [],
        places: placesData,
        scoring: {
          calculateScore: function(values) {
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
        indicators: {
          processed: indicators.processed(indicatorsData),
          remove: indicators.remove
        },
        sorting: {
          sort: utilities.sort,
          column: 'title',
          direction: 1
        },
        getIndicator: function(indicatorId, value) {
          return this.get('indicators.processed.all')[indicatorId][value];
        },
        isVisible: function(indicatorId) {
          return this.get('indicators.processed.visible').indexOf(indicatorId) > -1;
        }
      },
      computed: { },
      components: { filter: Filter }
    });

    // sorting observers
    ractive.on('sorting.sort', function(event, column) {
      this.set('sorting.column', column);
      this.set('sorting.direction', this.get('sorting.direction') * -1);
    });

    ractive.on('indicator.remove', function(event, indicatorId) {
    });

    // visible indicators
    //var observer = ractive.observe( 'scoring.scoringIndicators.*', function ( newValue, oldValue, keypath ) {

     // console.log( keypath + ' changed to ' );
      //console.log(newValue);
      //console.log(oldValue)
    //});


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