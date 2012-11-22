var Spigot = require('./index')
  , assert = require('assert')
  , concurrency = 2
  , running = 0
  ;

var spigot = new Spigot(concurrency, function(job, done) {
  ++running;
  assert.ok(running <= concurrency, 'not processing more than concurrency level');
  setTimeout(function() {
    assert.ok(running <= concurrency, 'not processing more than concurrency level');
    console.log(job.split('').reverse().join(' ').toUpperCase());
    --running;
    done();
  }, 5);
});

spigot.queue('meow mix');
spigot.queue('meow mix');
spigot.queue('meow mix');
spigot.queue('meow mix');
spigot.queue('meow mix');
spigot.queue('meow mix');
spigot.queue('meow mix');
spigot.queue('meow mix');
assert.equal(spigot.jobs.length, 8, 'processing has not started');
setTimeout(function() {
  assert.equal(spigot.jobs.length, 0, 'queue is empty');
  spigot.queue('meow mix');
  spigot.queue('meow mix');
  spigot.queue('meow mix');
  assert.equal(spigot.jobs.length, 3, 'processing has not started');
}, 100);
