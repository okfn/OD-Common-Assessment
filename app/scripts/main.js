'use strict';
/* jshint devel:true */
var app = (function(window) {

  // some of controller, fetch, and mapping to view
  function main(places, indicators, values) {

    var processedIndicators = services.prepareIndicators(indicators);
    var processCountries = services.preparePlaces(places, values, processedIndicators.visible);

    var data = {
      indicators: processedIndicators,
      // All values for an indicated, listed by place
      model: processCountries,
      groups: [{ 'id' : '', 'places' : processCountries }],
      sorting: {
        open: false,
    //    sort: utilities.sortGroups,
        column: 'title', // default
        direction: 1,
        grouping: ''
      },
      getIndicator: function(indicatorId, value) {
        return this.get('indicators.all')[indicatorId][value];
      },
      isVisible: function(indicatorId) {
        return this.get('indicators.visible').indexOf(indicatorId) > -1;
      }
    };

    views.init(data);
  }

  function runApp() {
    services.getData(main);
  }

  return {
    start: runApp
  };
}( window));