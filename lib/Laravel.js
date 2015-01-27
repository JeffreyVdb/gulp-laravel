"use strict";

var config      = require('./config'),
    tasks,
    _           = require('lodash'),
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

Laravel.addTask = function (name, plugin) {
  var task = new LaravelTask(name);
  plugin(task);

  // Create task for this plugin
  tasks[name] = task;
};

Laravel.makeTask = function (callback) {
  return new LaravelTask(callback);
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
  var task = tasks[taskName], gulpTask;
  if (!queue) queue = this.taskQueue;

  if (!task) {
    return this;
  }

  if (task.assertRequirementsMet()) {
    gulpTask = config.taskPrefix + ':' + taskName;
    this.getGulp().task(gulpTask, task.work);
    queue.push(gulpTask);
  }

  return this;
};

Laravel.prototype.startSection = function (sectionName) {
  this.notifier.message('Starting ' + sectionName);
  return this;
};

Laravel.prototype.run = function () {
  this.getGulp().getLaravel = function () {
    return this;
  }.bind(this);

  this.runSequence.apply(null, this.taskQueue);
  this.taskQueue = [];
  return this;
};

module.exports = Laravel;