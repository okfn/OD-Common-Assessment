'use strict';
/* jshint devel:true */

var app = (function () {
    function bindDropdownEvents() {
          $('#filter-dropdown ul').click(function(e) {
              console.log('stop');
                  e.stopPropagation();
          });
      }
    function bindToTemplate(element, template, incomingData) {
        var bound = new Ractive({
          el: element,
          template: template,
          data: incomingData
        });
        return bound;
    }
    function showInfo(data, tabletop) {
        // deconstruct data with tabletop
        var placesData = tabletop.sheets('places').elements;
        var indicatorsData = tabletop.sheets('indicators').elements;
        var valuesData = tabletop.sheets('values').elements;


        //console.log(placesData);
        //console.log(indicatorsData);
        //console.log(valuesData);
        // bind to templates
        var indicatorsForScoring = indicatorsData.filter(function(indicator) {
                                        return indicator.scoring === 'Y';
                                    }).map(function(indicator) {
                                        return indicator.id;
                                    });
        var visibleIndicators = indicatorsForScoring;

        var resultsData = placesData.map(function(place) {
            // for every country, get all indicator values
            place.values = [];
            valuesData.filter(function(value) {
                //console.log(value['placeId'],place.id)
                if(value['placeid'] === place.id) {
                    // todo: move to partials
                    value['indicatormeta'] = indicatorsData.filter(function(indicator){
                        if(value['indicatorid'] === indicator['id']) {
                            return indicator['id'];
                        }
                    })[0];
                    place['values'].push(value);
                }

            });

            return place;
        });

        //  console.log(valuesData)
        //var indicatorValuesForScoring =
        console.log(resultsData  );
        console.log(valuesData);
        // for each place
            // get indicator value
        //place indicator indicator indicator score
        //

        // visible
        //console.log(indicatorsForScoring);
        function isVisibleIndicator() {
            // visibleIndicator
           // if(indicatorsForScoring.filter()) return false
            //return true;
        }

        var bindTable = bindToTemplate('#table', '#template-table', {
                places: placesData,
                visibleIndicators: visibleIndicators,
                values:valuesData,
                numberOfVisibleIndicators: function() {
                    return visibleIndicators.length
                }
        });

//
//         //$("#fullTable").html(ich.countries(cc));
        //  var bindFilter = new Ractive({
        //   el: "#filter",
        //   template: "#template-filter",
        //   data: { items: filterData }
        // });

        //bindDropdownEvents();
    }

    function runApp(){
        services.getData(showInfo);
    }

    return {
        start: runApp
    };
}());

