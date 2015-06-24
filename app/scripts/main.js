'use strict';
/* jshint devel:true */

var app = (function() {
  function bindDropdownEvents() {
    $('#filter-dropdown ul').click(function(e) {
      //console.log('stop');
      e.stopPropagation();
    });
  }

  function showInfo(data, tabletop) {
    // Deconstruct data with tabletop
    var placesData = tabletop.sheets('places').elements;
    var indicatorsData = tabletop.sheets('indicators').elements;
    var valuesData = tabletop.sheets('values').elements;

    // Bind to templates
    var Filter = Ractive.extend({
      isolated: false,
      template: '#template-filter'
    });

    var Grouping = Ractive.extend({
      isolated: false,
      template: '#template-grouping'
    });

    var processedIndicators = indicators.indicators(indicatorsData);

    // Bind to ractive
    var ractive = new Ractive({
      el: '#table',
      template: '#template-table',
      data: {
        // All values for an indicated, listed by place
        places: indicators.places(placesData, valuesData, processedIndicators.visible),
        indicators: {
          // All indicator meta data
          processed: processedIndicators
        },
        sorting: {
          sort: utilities.sort,
          column: 'title', // default
          direction: 1
        },
        getIndicator: function(indicatorId, value) {
          return this.get('indicators.processed.all')[indicatorId][value];
        },
        isVisible: function(indicatorId) {
          return this.get('indicators.processed.visible').indexOf(indicatorId) > -1;
        },
        setScore: function ( i ) {

          var values = this.get( 'places.' + i + '.valuesMap');
          var score = 0;

          for(var key in values) {
            if(this.get('indicators.processed.visible').indexOf(values[key]['indicatorid']) > -1) {
              score += values[key]['normalised'];
            }
          }

          this.set( 'places.' + i + '.score', score);

          return score;
        }
      },

      computed: { },
      components: { filter: Filter, grouping: Grouping }
    });

    console.log(ractive.get('places'));
    console.log(ractive.get('indicators'));

    // Bind sorting events
    ractive.on('sorting.sort', function(event, column) {
      this.set('sorting.column', column);
      this.set('sorting.direction', this.get('sorting.direction') * -1);
    });

    ractive.on('indicators.processed.visible', function(event, indicatorId) {

    });

    ractive.on( 'indicators.score', function (event) {
      //console.log(event);
      //ractive.set(event.keypath +".price", event.context.sum / event.context.quantity)
    });

    //ractive.fire('indicators.score');

    bindDropdownEvents();
  }

  function runApp() {
    services.getData(showInfo);
  }

  return {
    start: runApp
  };
}());