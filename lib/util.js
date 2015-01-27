"use strict";
var execSync = require('exec-sync');

module.exports = {
  getFrameworkVersion: function () {
    var version = execSync('php artisan --version');
    return parseFloat(version.toString().replace(/^.*?\s+([0-9\.]+).*$/, '$1'));
  }
};