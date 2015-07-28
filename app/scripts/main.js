'use strict';
/* jshint devel:true */
var app = (function(window) {
    var data = {
      indicators: [],
      // All values for an indicated, listed by place
      model: [],
      groups: [],
      filter: {
        open: false,
      },
      sorting: {
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


    var Filtering = Ractive.extend({
      isolated: false,
      template: Templates.filter
    });

    var Grouping = Ractive.extend({
      isolated: false,
      template: Templates.group
    });

    var ractive = new Ractive({
      el: '#app',
      template: Templates.list,
      data: data,
      computed: { },
      components: { filtering: Filtering, grouping: Grouping }
    });

    // When sorting make sure we know the new state
    ractive.on('sorting.sort', function(event, column) {
      this.set('sorting.column', column);
      this.set('sorting.direction', this.get('sorting.direction') * -1);
    });

    // Open and close indicator dropdown
    ractive.on('filtering.filter.toggle', function(event) {
      console.log(ractive.get('filter.open') )
      ractive.get('filter.open') ? ractive.set('filter.open', false) : ractive.set('filter.open', true);
       console.log(ractive.get('filter.open') )
    });

    // Removing indicators with the pils / not related to scoring form
    ractive.on('indicator.remove', function(event, indicator) {
      this.remove('indicators.visible', event.context); // remove item
    });

    // Updating scores when indicators are added / removed, or when user groups indicators
    ractive.observe('sorting indicators.visible', function(newValue, oldValue, keypath) {
      //array, column, direction, grouping
      var updated = services.updateGrouping(ractive.get('model'),
          ractive.get('sorting.column'),
          ractive.get('sorting.direction'),
          ractive.get('sorting.grouping'),
          ractive.get('indicators.all.' + ractive.get('sorting.grouping') + '.sortorder'));
      ractive.set('groups', services.calculateVisibleScores(updated, this.get('indicators.visible')));
   });

  // some of controller, fetch, and mapping to view
  function bindData(places, indicators, values) {

    var processedIndicators = services.prepareIndicators(indicators);
    var processCountries = services.preparePlaces(places, values, processedIndicators.visible);

    ractive.set('indicators', processedIndicators);
    ractive.set('model', processCountries);
    ractive.set('groups', services.calculateVisibleScores([{ 'id' : '', 'places' : processCountries }], ractive.get('indicators.visible')) );
  }

  function runApp() {
    services.getData(bindData);
  }

  return {
    start: runApp
  };
}( window));