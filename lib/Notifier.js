"use strict";

var gutil = require('gulp-util'),
    chalk = require('chalk');

var Notifier = function () {
};

Notifier.prototype.message = function (msg) {
  gutil.log(chalk.green(msg));
};

Notifier.prototype.error = function (msg) {
  gutil.log(chalk.red(msg));
};

module.exports = Notifier;