"use strict";

var util     = require('./util'),
    gulpUtil = require('gulp-util');

var config5 = {
  production: !!gulpUtil.env.production,
  srcDir: 'app',
  assetsDir: 'resources/assets/',
  cssOutput: 'public/css',
  jsOutput: 'public/js',
  bowerDir: 'vendor/bower_components',
  tasks: [],
  watchers: { default: {} },
  duplicate: [],
  concatenate: { css: [], js: [] }
};

module.exports = (function factory() {
  var laravelVersion = util.getFrameworkVersion();
  if (laravelVersion >= 5.0) {
    return config5;
  }

  // no config found
  return null;
}());