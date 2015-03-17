
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
  //console.log(JSON.stringify(data,null,2));
  var return_gender = {'0':'male', '1':'female'}

  for (var i = 0; i < data.matches.length; i++) {
  	match = data.matches[i]
  	console.log(match.person.name + "(" + return_gender[match.person.gender.toString()] + "), "  + match.person.bio)
    //console.log(match)
  }

  //console.log(data)

  console.log("number of matches: " + data.matches.length)

  /**
   * Add code here.
   */

});
