'use strict';
/* jshint devel:true */

var app = (function() {
  function bindDropdownEvents() {
    $('#filter-dropdown ul').click(function(e) {
      //console.log('stop');
      e.stopPropagation();
    });
  }


//the check box asks the controller to update the visible indexes.
//it then rebuilds the list indexes for each country,
//then calculates the score and updates the list of visible indexes.
//it then tells ractive to set the new view models
//you controller _should_ be setting up the json that drives the view... the view model.
//there should be the list of countries with index data, and a list of indexes and their visibility
//

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
      updateScore: function ( i ) {

        var values = this.get( 'places.' + i + '.valuesMap');
        var score = 0;

        for(var key in values) {
          if(this.get('indicators.visible').indexOf(values[key]['indicatorid']) > -1) {
            score += values[key]['normalised'];
          }
        }

        //this.set( 'places.' + i + '.score', score);

        return score;
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