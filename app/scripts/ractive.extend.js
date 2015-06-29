'use strict';
Ractive.prototype.remove = function(keypath, item){
  var array = this.get(keypath),
    index = array.indexOf(item)
  if(index!==-1) {
    return this.splice(keypath, index, 1)
  } else {
    return Promise.defer()
  }
}
