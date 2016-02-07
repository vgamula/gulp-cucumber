var gulp = require('gulp');
var expect = require('chai').expect;
var spawn = require('child_process').spawn;
var cucumber = require('./');


gulp.task('cucumber', function() {
    return gulp.src('features/*').pipe(cucumber({
        'steps': 'features/step_definitions/*_steps.js',
        'support': 'features/support/*.js',
        'format': ['summary'],
        'tags': ['@gulpcucumber', '~@wip']
    })).once('end', function() {
        console.log('end');
    });
});

gulp.task('test', function(callback) {
    var p = spawn('gulp', ['cucumber']);
    var chunks = [];
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', function(chunk) {
        chunks.push(chunk);
    });
    p.on('close', function(status) {
        try {
            if (status !== 0) {
                throw new Error('gulp-cucumber exited: ' + status);
            } else {
                var text = chunks.join('');
                expect(text).to.match(/Meow!/);
                expect(text).to.match(/end/);
            }
            callback();
        } catch (e) {
            callback(e);
        }
    });
});
