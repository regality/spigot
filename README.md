### Spigot

![spigot](http://i.imgur.com/yD7fE.jpg)

This is a javascript library that allows you to queue up as many jobs as
you want and process them at a specified concurrency rate.

```javascript
var Spigot = require('spigot')
  , concurrency = 2 // process 2 jobs at a time (at most)

var spigot = new Spigot(concurrency, function(job, done) {
  console.log(job);
  done();
});

spigot.on('error', function(err, job) {
  console.log('oh noes, error ' + err + ' with job ' + job);
});

spigot.on('empty', function() {
  console.log('all done');
});

spigot.on('done', function(job) {
  console.log('finished job ' + job);
});

for (var i = 0; i < 100; ++i) {
  spigot.queue('meow ' + i);
}
```
