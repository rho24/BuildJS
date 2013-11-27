var q = require('q');

var colors = require('colors');

var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

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


var MsbuildTask = function() {
  var that = this;
  that.exe = 'C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\msbuild.exe';

  that.run = function() {
    execFile(that.exe, ['/?'], {cwd:'./'}, function (error, stdout, stderr) {
      console.log('stdout:'.bold);
      console.log(stdout.green);
      console.log();

      console.log('stderr:'.bold);
      console.error(stderr.red);
      console.log();

      if (error !== null) {
        console.log('exec error:'.bold);
        console.error(error.red);
        console.log();
      }
    })
  }
}


module.exports.run = function() {
  var buildTask = new Task('build');
  var testTask = new Task('test');
  var msbuild = new MsbuildTask();


  q()
  .then(buildTask.run)
  .then(testTask.run)
  .then(msbuild.run)
}