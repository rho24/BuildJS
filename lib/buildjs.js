var q = require('q');



var Task = function(name) {
  var that = this;
  that.name = name;
  that.run = function() {
    var deferred = q.defer();
    setTimeout(function() {
      console.log('Task: ' + that.name);
      deferred.resolve({task: that});
    }, 500);

    return deferred.promise;
  }
}



module.exports.run = function() {
  var buildTask = new Task('build');
  var testTask = new Task('test');


  q()
  .then(buildTask.run)
  .then(testTask.run);
}