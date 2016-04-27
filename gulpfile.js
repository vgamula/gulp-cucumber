var gulp = require('gulp');
var expect = require('chai').expect;
var spawn = require('child_process').spawn;
var cucumber = require('./');
var runSequence = require('run-sequence');

gulp.task('test', function (cb) {
    runSequence('test:options', 'test:customend', 'test:failure', 'test:ignorefailure', 'test:customerror', cb);
});

gulp.task('test:options', function (callback) {
    var p = spawn('gulp', ['cucumber:options']);
    var chunks = [];
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', function (chunk) {
        chunks.push(chunk);
    });
    p.on('close', function (status) {
        try {
            if (status !== 0) {
                throw new Error('gulp-cucumber exited: ' + status);
            } else {
                var text = chunks.join('');
                expect(text).to.match(/Starting 'cucumber:options'.../);
                expect(text).to.match(/Meow!/);
                expect(text).to.match(/cucumber:options end event/);
                expect(text).to.match(/Finished 'cucumber:options'/);
            }
            callback();
        } catch (e) {
            callback(e);
        }
    });
});

gulp.task('cucumber:options', function () {
    return gulp.src('features/*').pipe(cucumber({
        'steps': 'features/step_definitions/*_steps.js',
        'support': 'features/support/*.js',
        'format': ['summary'],
        'tags': ['@gulpcucumber', '~@wip']
    })).once('end', function () {
        console.log('cucumber:options end event');
    });
});

gulp.task('test:failure', function (callback) {
    var p = spawn('gulp', ['cucumber:failure']);
    var chunks = [];
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', function (chunk) {
        chunks.push(chunk);
    });
    p.on('close', function (status) {
        try {
            if (status !== 1) {
                throw new Error('gulp-cucumber exited: ' + status);
            } else {
                var text = chunks.join('');
                expect(text).to.match(/Starting 'cucumber:failure'.../);
                expect(text).to.match(/Meow!/);
                expect(text).to.match(/AssertionError: expected 100 to equal 200/);
                expect(text).to.match(/'cucumber:failure' errored/);
            }
            callback();
        } catch (e) {
            callback(e);
        }
    });
});

gulp.task('cucumber:failure', function (done) {
    return gulp.src('failures/*')
        .pipe(cucumber({
            'steps': 'failures/step_definitions/*_steps.js',
            'support': 'failures/support/*.js',
            'format': ['summary'],
            'tags': ['@gulpcucumber', '~@wip']
        }));
});

gulp.task('test:ignorefailure', function (callback) {
    var p = spawn('gulp', ['cucumber:ignorefailure']);
    var chunks = [];
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', function (chunk) {
        chunks.push(chunk);
    });
    p.on('close', function (status) {
        try {
            if (status !== 0) {
                throw new Error('gulp-cucumber exited: ' + status);
            } else {
                var text = chunks.join('');
                expect(text).to.match(/Starting 'cucumber:ignorefailure'.../);
                expect(text).to.match(/Meow!/);
                expect(text).to.match(/AssertionError: expected 100 to equal 200/);
                expect(text).to.match(/Finished 'cucumber:ignorefailure'/);
            }
            callback();
        } catch (e) {
            callback(e);
        }
    });
});

gulp.task('cucumber:ignorefailure', function (done) {
    return gulp.src('failures/*')
        .pipe(cucumber({
            'steps': 'failures/step_definitions/*_steps.js',
            'support': 'failures/support/*.js',
            'format': ['summary'],
            'tags': ['@gulpcucumber', '~@wip'],
            'emitErrors': false
        }));
});

gulp.task('test:customend', function (callback) {
    var p = spawn('gulp', ['cucumber:customend']);
    var chunks = [];
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', function (chunk) {
        chunks.push(chunk);
    });
    p.on('close', function (status) {
        try {
            if (status !== 0) {
                throw new Error('gulp-cucumber exited: ' + status);
            } else {
                var text = chunks.join('');
                expect(text).to.match(/Starting 'cucumber:customend'.../);
                expect(text).to.match(/Meow!/);
                expect(text).to.match(/cucumber:customend end event/);
                expect(text).to.match(/Finished 'cucumber:customend'/);
            }
            callback();
        } catch (e) {
            callback(e);
        }
    });
});

gulp.task('cucumber:customend', function (done) {
    gulp.src('features/*')
        .pipe(cucumber({
            'steps': 'features/step_definitions/*_steps.js',
            'support': 'features/support/*.js',
            'format': ['summary'],
            'tags': ['@gulpcucumber', '~@wip']
        }))
        .once('end', function () {
            console.log('cucumber:customend end event');
            done();
        });
});

gulp.task('test:customerror', function (callback) {
    var p = spawn('gulp', ['cucumber:customerror']);
    var chunks = [];
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', function (chunk) {
        chunks.push(chunk);
    });
    p.on('close', function (status) {
        try {
            if (status !== 1) {
                throw new Error('gulp-cucumber exited: ' + status);
            } else {
                var text = chunks.join('');
                expect(text).to.match(/Starting 'cucumber:customerror'.../);
                expect(text).to.match(/Meow!/);
                expect(text).to.match(/AssertionError: expected 100 to equal 200/);
                expect(text).to.match(/cucumber:customerror error event/);
                expect(text).to.match(/'cucumber:customerror' errored/);
                
                expect(text).to.not.match(/cucumber:customerror end event/);
            }
            callback();
        } catch (e) {
            callback(e);
        }
    });
});

gulp.task('cucumber:customerror', function (done) {
    gulp.src('failures/*')
        .pipe(cucumber({
            'steps': 'failures/step_definitions/*_steps.js',
            'support': 'failures/support/*.js',
            'format': ['summary'],
            'tags': ['@gulpcucumber', '~@wip']
        }))
        .once('error', function (err) {
            console.log('cucumber:customerror error event');
            done(err);
        })
        .once('end', function () {
            console.log('cucumber:customerror end event');
            done();
        });
});
