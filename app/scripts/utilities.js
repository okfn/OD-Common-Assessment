'use strict';
/* jshint devel:true */

var utilities = (function() {

  // function sortGroups(data, column, direction) {
  //   var groups = data;
  //   for(var group in groups) {
  //     var sorted = [];
  //     // for ease of displaying groups
  //     groups[group]['places'][0]['first'] = false;
  //     sorted = sort(groups[group]['places'], column, direction);
  //     groups[group]['places'][0]['first'] = true;
  //     groups[group].places = sorted;
  //   }
  //   return groups;
  // }

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
    // sortGroups: sortGroups,
    isTrue: isTrue,
    slugify: slugify
  }
}());