// # Browserify entry point for the global.js bundle

var Tabletop = require('tabletop').Tabletop;
//var Sheetsee = require('sheetsee');

var View = require('./view');

var view = new View({
  el: '#content'
});

console.log('global.js loaded!');

// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1CzPZ8V_pyCQDSpGvvv-MMORt8qx-QhSxTCL_kifeFJs/edit?usp=sharing';
// function init() {
//     Tabletop.init( { key: public_spreadsheet_url,
//                      callback: showInfo,
//                      simpleSheet: true } )
//     }

//     function showInfo(data, tabletop) {
//     alert("Successfully processed!")
//     console.log(data);
// }