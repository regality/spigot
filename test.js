var Spigot = require('./index')
  , assert = require('assert')
  ;

var spigot = new Spigot(2, function(job, done) {
  console.log('## ' + job);
  done();
});

spigot.queue('meow');
spigot.queue('meow');
spigot.queue('meow');
spigot.queue('meow');
spigot.queue('meow');
spigot.queue('meow');
spigot.queue('meow');
spigot.queue('meow');
assert.equal(spigot.jobs.length, 8);
setTimeout(function() {
  assert.equal(spigot.jobs.length, 0);
  spigot.queue('meow');
  spigot.queue('meow');
  spigot.queue('meow');
  assert.equal(spigot.jobs.length, 3);
}, 50);
