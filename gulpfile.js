
var gulp = require('gulp');
var cucumber = require('./');
var spawn = require('child_process').spawn;
var expect = require('chai').expect;

gulp.task('cucumber', function() {
    return gulp.src('features/*').pipe(cucumber({
        'steps': 'features/step_definitions/*_steps.js',
        'support': 'features/support/*.js',
        'format': 'summary'
    })).once('end', function() {
        console.log('stream end!!');
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
                throw new Error('gulp cucumber exited: ' + status);
            } else {
                var text = chunks.join('');
                expect(text).to.match(/meow!!/);
                expect(text).to.match(/stream end!!/);
            }
            callback();
        } catch (e) {
            callback(e);
        }
    })
});
