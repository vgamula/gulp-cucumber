var path = require('path');

var glob = require('simple-glob');
var through2 = require('through2');
var Cucumber = require('cucumber');


var clearFileCache = function(filePath) {
    delete require.cache[require.resolve(path.resolve(filePath))];
}

module.exports = function(options) {
    var files = [];
    var runOptions = [];
    var emitErrors = true;

    if (options.support) {
        files = files.concat(glob([].concat(options.support)));
    }
    if (options.steps) {
        files = files.concat(glob([].concat(options.steps)));
    }
    files.forEach(function(file) {
        clearFileCache(file);
        runOptions.push('-r');
        runOptions.push(file);
    });

    if (!options.format) {
        options.format = 'pretty';
    }

    var formats = Array.isArray(options.format) ? options.format : [options.format];

    formats.forEach(function(f) {
        runOptions.push('--format');
        runOptions.push(f);
    });

    if (options.tags) {
        var tags = Array.isArray(options.tags) ? options.tags : [options.tags];

        tags.forEach(function(t) {
            runOptions.push('--tags');
            runOptions.push(t);
        });
    }

    if (options.compiler) {
        runOptions.push('--compiler');
        runOptions.push(options.compiler);
    }

    if (options.emitErrors === false) {
        emitErrors = false;
    }

    var features = [];

    var collect = function(file, enc, callback) {
        var filename = file.path;
        if (filename.indexOf('.feature') === -1) {
            return callback();
        }
        features.push(filename);
        callback();
    };

    var run = function() {
        var argv = ['node', 'cucumber-js'];

        argv.push.apply(argv, runOptions);
        argv.push.apply(argv, features);

        var stream = this;
        Cucumber.Cli(argv).run(function(succeeded) {
            if (succeeded || !emitErrors) {
                stream.emit("end");
            } else {
                stream.emit("error", new Error('Cucumber tests failed!'));
            }
        });
    };

    return through2.obj(collect, run);
};
