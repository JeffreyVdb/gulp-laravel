"use strict";

var metaKey  = '_taskMeta',
    Notifier = require('./Notifier'),
    _        = require('lodash');

var LaravelTask = function (name) {
  this.name = name;
  this.config = {};
  this.notifier = new Notifier(name);
  this.plugins = {};
  this[metaKey] = {
    requirements: []
  };
};

LaravelTask.prototype.getName = function () {
  return this.name;
};

LaravelTask.prototype.setConfig = function (config) {
  this.config = config;
};

LaravelTask.prototype.exec = function (callback) {
  this.work = callback;
};

LaravelTask.prototype.setMeta = function (k, v) {
  this[metaKey][k] = v;
};

LaravelTask.prototype.getMeta = function (k) {
  return this[metaKey][k];
};

LaravelTask.prototype.getRequirements = function () {
  return this.getMeta('requirements');
};

LaravelTask.prototype.setRequirements = function (requirements) {
  this.setMeta('requirements', requirements);
};

LaravelTask.prototype.assertRequirementsMet = function () {
  var requirements = this.getRequirements(), status = true;
  _.forEach(requirements, function (req) {
    var plugin, newName;
    try {
      plugin = require(req);
    }
    catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        this.notifier.error('Module ' + req + ' was not found.');
        return (status = false);
      }
    }

    newName = _.camelCase(req.replace(/^gulp\-/i, ''));
    this['plugins'][newName] = plugin;
  }.bind(this));

  return status;
};

module.exports = LaravelTask;