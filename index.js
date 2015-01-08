var through2 = require('through2');
var glob = require('simple-glob');
var fs = require('fs');
var Cucumber = require('cucumber');

var cucumber = function(options) {
    var runOptions = [];

    // load support files and step_definitions from options
    var files = [];
    if (options.support) {
        files = files.concat(glob([].concat(options.support)));
    }

    if (options.steps) {
        files = files.concat(glob([].concat(options.steps)));
    }

    files.forEach(function(file) {
        runOptions.push('-r');
        runOptions.push(file);
    });

    runOptions.push('-f');
    var format = options.format || 'pretty';
    runOptions.push(format);

    var features = [];

    var collect = function(file, enc, callback) {
        var filename = file.path;
        if (filename.indexOf(".feature") === -1) {
            return callback();
        }

        features.push(filename);
        callback();
    };

    var run = function(callback) {
        var argv = ['node', 'cucumber-js'];
        argv.push.apply(argv, runOptions);
        argv.push.apply(argv, features);
        Cucumber.Cli(argv).run(function(succeeded) {
            if (succeeded) {
                callback()
                stream.emit('end')
            } else {
                callback(new Error("Cucumber tests failed!"))
            }
        })
    };

    return through2.obj(collect, run);
};

module.exports = cucumber;
