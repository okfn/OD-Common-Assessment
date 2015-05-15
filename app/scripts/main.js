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
        var placesData = tabletop.sheets("places").elements;
        console.log(placesData);

        var bindTable = bindToTemplate("#table", "#template-table", {"places": placesData });

        //$("#fullTable").html(ich.countries(cc));
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

