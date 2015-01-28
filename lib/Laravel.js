"use strict";

var config      = require('./config'),
    tasks,
    _           = require('lodash'),
    $           = require('gulp-load-plugins')(),
    Notifier    = require('./Notifier'),
    LaravelTask = require('./LaravelTask');

var Laravel = function (gulp) {
  this.runSequence = require('run-sequence').use(gulp);
  this.taskQueue = [];
  this.gulp = gulp;
  this.config = config;
  this.notifier = new Notifier();
};

tasks = Laravel.tasks = {};

var getTask = function (taskName) {
  return tasks[taskName];
};

Laravel.addTask = function (name, plugin, config) {
  var task = new LaravelTask(name);
  task.config = config || {};

  // Let user define task and set requirements
  plugin(task);

  // Create task for this plugin
  tasks[name] = task;
};

Laravel.prototype.getGulp = function () {
  return this.gulp;
};

Laravel.prototype.tasksAsync = function (tasks) {
  var queue = [];
  _.forEach(tasks, function (taskName) {
    this.task(taskName, queue);
  }.bind(this));

  // Add to taskQueue
  this.taskQueue.push(queue);

  return this;
};

Laravel.prototype.task = function (taskName, queue) {
  var task = getTask(taskName), gulpTask;
  if (!queue) queue = this.taskQueue;

  if (!task) {
    this.notifier.error('task ' + taskName + ' does not exist');
    return this;
  }

  if (task.assertRequirementsMet()) {
    gulpTask = config.taskPrefix + ':' + taskName;
    this.getGulp().task(gulpTask, task.work);
    queue.push(gulpTask);
  }

  return this;
};

Laravel.taskConfig = function (taskName, config) {
  var task = getTask(taskName);
  if (! task) {
    this.notifier.error('cannot set config for undefined task: ' + taskName);
    return false;
  }

  task.setConfig(config);
};

Laravel.prototype.$ = $;
Laravel.prototype.run = function () {
  this.getGulp().getLaravel = function () {
    return this;
  }.bind(this);

  this.runSequence.apply(null, this.taskQueue);
  this.taskQueue = [];
  return this;
};

module.exports = Laravel;