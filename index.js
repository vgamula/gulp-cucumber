var es = require('event-stream');
var spawn = require('child_process').spawn;
var glob = require('simple-glob');
var fs = require('fs');


var binPath = (process.platform === 'win32') ? 
    '\\node_modules\\.bin\\cucumber-js.cmd':
    '/node_modules/cucumber/bin/cucumber.js';

binPath = fs.existsSync(binPath) ? binPath : __dirname + binPath;

var cucumber = function(options) {
    var runOptions = [];

    // load support files and step_definitions from config
    glob([].concat(options.support || '', options.steps || '')).forEach(function (file) {
        runOptions.push('-r');
        runOptions.push(file);
    });

    var run = function(argument, callback) {
        var filename = argument.path;
        if (filename.indexOf(".feature") === -1) {
            return callback();
        }

        var processOptions = runOptions.slice(0);
        processOptions.push(filename);

        var cli = spawn(binPath, processOptions);

        var output = [];

        cli.stdout.on('data', function(data) {
            output.push(data);
        });

        cli.on('exit', function(exitCode) {
            var data = Buffer.concat(output).toString();
            var startIndex = data.substring(0, data.indexOf('"keyword": "Feature"')).lastIndexOf('[');
            var featureOutput = data.substring(startIndex);
            process.stdout.write(featureOutput.trim());
            process.stdout.write('\r\nFeature: ' + filename + '\r\n');
        });
        return callback();
    };

    return es.map(run);
};

module.exports = cucumber;
