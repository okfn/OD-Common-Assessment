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
          calculateScore: indicators.calculate
        },
        indicators: {
          processed: indicators.processed(indicatorsData)
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

    ractive.on('indicators.processed.visible', function(event, indicatorId) {
      // todo: marry the indicators with the filter list
    });
    //this.set( 'items[*].completed', event.node.checked );

    bindDropdownEvents();
  }

  function runApp() {
    services.getData(showInfo);
  }

  return {
    start: runApp
  };
}());