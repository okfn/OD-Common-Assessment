'use strict';
/* jshint devel:true */

var views = (function() {

  function bindToTemplate(data){
    var Filter = Ractive.extend({
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
      components: { filter: Filter, grouping: Grouping }
    });

    // When sorting make sure we know the new state
    ractive.on('sorting.sort', function(event, column) {
      this.set('sorting.column', column);
      this.set('sorting.direction', this.get('sorting.direction') * -1);
    });

    // Open and close indicator dropdown
    ractive.on('filter.toggle', function(event, thing) {
      this.get('filter.open') ? this.set(false) : ractive.set(true);
    });

    // Removing indicators with the pils / not related to scoring form
    ractive.on('indicator.remove', function(event, indicator) {
      this.remove('indicators.visible', event.context); // remove item
    });

    // Updating scores when indicators are added / removed, or when user groups indicators
    ractive.observe('sorting indicators.visible', function(newValue, oldValue, keypath) {
      //array, column, direction, grouping
      //console.log(newValue, oldValue, keypath)
      var updated = services.updateGrouping(ractive.get('model'),
          ractive.get('sorting.column'),
          ractive.get('sorting.direction'),
          ractive.get('sorting.grouping'),
          ractive.get('indicators.all.' + ractive.get('sorting.grouping') + '.sortorder'));
      ractive.set('groups', services.calculateVisibleScores(updated, this.get('indicators.visible')));
   });

  }

  return {
    init: bindToTemplate
  }
}());