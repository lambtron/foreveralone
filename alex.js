
/**
 * How to run this.
 *
 * $ node --harmony alex.js
 */

/**
 * Module dependencies.
 */

var fs = require('fs');
var co = require('co');

/**
 * Do stuff.
 */

co(function *() {
  // Read data from tinder.txt
  var data = fs.readFileSync('tinder.txt');

  // Turn data to JS object.
  data = JSON.parse(data);

  // Do cool stuff!
  console.log(JSON.stringify(data,null,2);

  /**
   * Add code here.
   */

});

