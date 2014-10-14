var es = require('event-stream');

var cucumber = function (options) {
	var WinPath = '.\\node_modules\\.bin\\cucumber-js.cmd';
	var UnitPath = './node_modules/cucumber/bin/cucumber.js';

	var process = function (argument, callback) {

		console.log(options);

	};

	return es.map(process);
};

module.exports = cucumber;