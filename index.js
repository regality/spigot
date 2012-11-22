"use strict";

var events       = require('events')
  , util         = require('util')
  , EventEmitter = events.EventEmitter
  ;

module.exports = Spigot;

function Spigot(concurrency, cb) {
  this.concurrency = concurrency;
  this.callback = cb;
  this.activeThreads = 0;
  this.jobs = [];
}
util.inherits(Spigot, EventEmitter);

Spigot.prototype.queue = function(job) {
  this.jobs.push(job);
  process.nextTick(this.next.bind(this));
}

Spigot.prototype.next = function() {
  if (this.activeThreads >= this.concurrency) return;
  if (this.jobs.length === 0) return;
  this.activeThreads += 1;
  var self = this;
  var job = this.jobs.shift();
  this.callback(job, function(err) {
    self.done(err, job);
  });
}

Spigot.prototype.increaseConcurrency = function() {
  this.concurrency += 1;
}

Spigot.prototype.decreaseConcurrency = function() {
  this.concurrency -= 1;
}

Spigot.prototype.done = function(err, job) {
  this.activeThreads -= 1;
  err ? this.emit('error', err, job) : this.emit('done', job);
  if (this.jobs.length === 0) return this.emit("empty");
  this.next();
}
