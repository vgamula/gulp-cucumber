
var gulp = require('gulp');
var cucumber = require('./');

gulp.task('test', function() {
    return gulp.src('features/*').pipe(cucumber({
        'steps': 'features/step_definitions/*_steps.js',
        'support': 'features/support/*.js',
        'format': 'summary'
    }));
});
