'use strict';
/* jshint devel:true */

var app = (function() {
  function bindDropdownEvents() {
    $('#filter-dropdown ul').click(function(e) {
      //console.log('stop');
      e.stopPropagation();
    });
  }


// some of controller, fetch, and mapping to view
  function main(places, indicators, values) {

    var processedIndicators = services.prepareIndicators(indicators);
    var processCountries = services.preparePlaces(places, values, processedIndicators.visible);

    var data = {
      indicators: processedIndicators,
      // All values for an indicated, listed by place
      places: processCountries,
      sorting: {
        sort: utilities.sort,
        column: 'title', // default
        direction: 1
      },
      getIndicator: function(indicatorId, value) {
        return this.get('indicators.all')[indicatorId][value];
      },
      isVisible: function(indicatorId) {
        return this.get('indicators.visible').indexOf(indicatorId) > -1;
      },
      removeIndicator: function(event, thing) {
        console.log(event, thing)
      }
    };

    views.init(data);

    bindDropdownEvents();
  }

  function runApp() {
    services.getData(main);
  }

  return {
    start: runApp
  };
}());