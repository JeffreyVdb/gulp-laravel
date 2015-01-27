"use strict";

var util     = require('./util'),
    _        = require('lodash'),
    gulpUtil = require('gulp-util');

var general = {
  taskPrefix: 'laravel'
};

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
  var laravelVersion = util.getFrameworkVersion(), config;
  if (laravelVersion >= 5.0) {
    config = config5;
  }

  if (config) {
    return _.merge(general, config);
  }

  // no config found
  return null;
}());