// # Browserify entry point for the global.js bundle (yay CoffeeScript!)

var View, view;

View = require('./view');

view = new View({
  el: '#content'
});

console.log('global.js loaded!');