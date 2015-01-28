"use strict";

var Laravel = require('./lib/Laravel'),
    fs      = require('fs'),
    tasks   = fs.readdirSync(__dirname + '/lib/tasks');

// Include predefined tasks
tasks.forEach(function (task) {
  task = task.replace(/\.js$/, '');
  Laravel.addTask(task, require('./lib/tasks/' + task));
});

module.exports = Laravel;
