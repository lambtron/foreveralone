
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var Tinder = require('../lib/tinder');
var report = require('../lib/report');
// var fs = require('fs');

/**
 * Render index html page.
 */

exports.index = function *index() {
  this.body = yield render('index');
};

/**
 * Render the report.
 */

exports.report = function *report() {
  var qs = this.request.query;
  var data = JSON.parse(qs.js);
  this.body = yield render('report', { data: data });
};

/**
 * Submit.
 */

exports.submit = function *submit() {
  var user = this.request.body;
  if (!user) return this.body = 'No user.';
  var tinder = new Tinder(user.tinderId, user.tinderToken);
  yield tinder.authenticate();
  user = yield tinder.getHistory();

  // fs.writeFileSync('tinder.txt', JSON.stringify(user, null, 2), { encoding: 'utf8' });

  var data = report(user);
  var qs = encodeURI(JSON.stringify(data));
  return redirect('/r/?js=' + qs);
};
