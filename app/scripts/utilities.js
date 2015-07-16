'use strict';
/* jshint devel:true */

var utilities = (function() {

  /* Sort array */
  function sort(array, column, direction) {
    array = array.slice();
    var c = array.sort(function(a, b) {
      return a[column] < b[column] ? -direction : direction;
    });
    return c;
  }

  /* For grouping */
  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  /* Expect dirty data from spreadsheet, json etc */
  function isTrue(value) {
    if(value.toLowerCase() === 'y' || value.toLowerCase() === 'true' || value == true) {
      return true;
    } else { return false; }
  }

  return {
    sort: sort,
    isTrue: isTrue,
    slugify: slugify
  }
}());