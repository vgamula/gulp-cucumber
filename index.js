var es = require('event-stream');
var spawn = require('child_process').spawn;

var cucumber = function (options) {
	var WinPath = '.\\node_modules\\.bin\\cucumber-js.cmd';
	var UnixPath = './node_modules/cucumber/bin/cucumber.js';

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

	var run = function (argument, callback) {
    	var cli = spawn(binPath, runOptions);

    	var printData = function (data) {
			var data = new Buffer(data);
			console.log(data.toString());
    	}

    	cli.stdout.on('data', printData);
    	cli.stderr.on('data', printData);
    	cli.on('exit', printData);
	};

	return es.map(run);
};

module.exports = cucumber;