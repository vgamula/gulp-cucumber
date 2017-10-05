const path = require('path');
const glob = require('glob');
const through2 = require('through2');
const cucumber = require('cucumber');

const featureRegExp = /\.feature$/i;

function clearFileCache(filePath) {
    delete require.cache[require.resolve(path.resolve(filePath))];
}

function getFiles(patterns) {
    const output = new Set();
    [].concat(patterns).forEach((p) => {
        glob.sync(p).forEach((f) => {
            output.add(f);
        });
    });
    return [...output];
}

module.exports = function ({
    files = [],
    runOptions = [],
    emitErrors = true,
    support = [],
    steps = [],
    format,
    tags,
    compiler,
    worldParameters,
} = {}) {

    [].concat(files)
        .concat(getFiles(support))
        .concat(getFiles(steps))
        .forEach((file) => {
            clearFileCache(file);
            runOptions.push('-r');
            runOptions.push(file);
        });

    if (format) {
        [].concat(format)
            .forEach((f) => {
                runOptions.push('--format');
                runOptions.push(f);
            });
    }
    if (tags) {
        runOptions.push('--tags');
        runOptions.push(tags);
    }
    if (compiler) {
        runOptions.push('--compiler');
        runOptions.push(compiler);
    }
    if (worldParameters) {
        runOptions.push('--world-parameters');
        runOptions.push(JSON.stringify(worldParameters));
    }

    const features = [];

    function collect(file, enc, cb) {
        const filename = file.path;
        if (featureRegExp.test(filename)) {
            features.push(filename);
        }
        cb();
    }
    function run() {
        const cli = new cucumber.Cli({
            argv: ['node', 'cucumber-js'].concat(runOptions).concat(features),
            cwd: process.cwd(),
            stdout: process.stdout,
        });

        cli.run().then((success) => {
            if (success || !emitErrors) {
                this.emit('end');
            } else {
                this.emit('error', new Error('Cucumber tests failed!'));
            }
        });
    }

    return through2.obj(collect, run);
};
