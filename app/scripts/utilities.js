'use strict';
/* jshint devel:true */

var utilities = (function() {

  function sort(array, column, sd) {
    //console.log(array, column, sd)
    array = array.slice();
    var c = array.sort(function(a, b) {
      //console.log(a[column] < b[column], a, b[column], column)
      return a[column] < b[column] ? -sd : sd;
    });
    //console.log(c)
    return c;
  }

  /* Expect dirty data from spreadsheet, json etc */
  function isTrue(value) {
    if(value.toLowerCase() === 'y' || value.toLowerCase() === 'true' || value == true) {
      return true;
    } else { return false; }
  }

  return {
    sort: sort,
    isTrue: isTrue
  }
}());