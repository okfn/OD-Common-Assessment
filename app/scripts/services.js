'use strict';
/* jshint devel:true */

var services = (function () {


    function getDataFromGoogleSpreadsheet(callback) {
        var URL = "1kOOvztwbY1RNm545RKG8Ua6bh2GgX-P_wFadPkdH2ig";
        Tabletop.init( { key: URL, callback: callback, simpleSheet: false, prettyColumnNames: false } );

        // $('#apply').on('click', function() {
        //     $('#filter-dropdown').trigger('hide.bs.dropdown');
        // });
    }

    return {
        getData: getDataFromGoogleSpreadsheet
    };
}());

