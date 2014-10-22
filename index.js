var es = require('event-stream');
var spawn = require('child_process').spawn;

var WinPath = __dirname + '\\node_modules\\.bin\\cucumber-js.cmd';
var UnixPath = __dirname + '/node_modules/cucumber/bin/cucumber.js';

var cucumber = function(options) {

    var runOptions = [];

    if (options.steps) {
        runOptions.push('-r');
        runOptions.push(options.steps);
    }

    if (process.platform === 'win32') {
        binPath = WinPath;
    } else {
        binPath = UnixPath;
    }

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
            process.stdout.write('\r\nFeature: ' + filename);
        });
        return callback();
    };
    return es.map(run);
};

module.exports = cucumber;
