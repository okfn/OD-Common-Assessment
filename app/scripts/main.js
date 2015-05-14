'use strict';
/* jshint devel:true */
//console.log('\'Allo \'Allo!');

function bindDropdownEvents() {
    $('#filter-dropdown').click(function(e) {
        console.log('stop');
            e.stopPropagation();
    });
}


