"use strict";

var Laravel = require('./lib/Laravel');
Laravel.addTask('cssmin', require('./lib/tasks/cssmin'));

module.exports = Laravel;
