"use strict";

var gutil = require('gulp-util'),
    chalk = require('chalk');

var Notifier = function (prefix) {
  if (prefix) this.setPrefix(prefix);
};

Notifier.prototype.setPrefix = function (prefix) {
  this.prefix = chalk.yellow(prefix) + ': ';
};

Notifier.prototype.message = function (msg) {
  gutil.log(this.prefix + chalk.green(msg));
};

Notifier.prototype.error = function (msg) {
  gutil.log(this.prefix + chalk.red(msg));
};

module.exports = Notifier;