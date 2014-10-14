var es = require('event-stream');
var spawn = require('child_process').spawn;

var WinPath = '.\\node_modules\\.bin\\cucumber-js.cmd';
var UnixPath = './node_modules/cucumber/bin/cucumber.js';

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

    	//var b = new Buffer(argument);
    	//console.log(b.toString());

    	console.log(argument);

        var cli = spawn(binPath, runOptions);

        var output = [];

        cli.stdout.on('data', function(data) {
            output.push(data);
        });

        cli.stderr.on('data', function(data) {
            //console.log(data);
        });

        cli.on('exit', function(exitCode) {

            var data = Buffer.concat(output).toString();

            var startIndex = data.substring(0, data.indexOf('"keyword": "Feature"')).lastIndexOf('[');
            //var logOutput = data.substring(0, startIndex - 1);
            var featureOutput = data.substring(startIndex);

            console.log(featureOutput);
        });


    };

    return es.map(run);
};

module.exports = cucumber;
