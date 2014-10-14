var gulp = require('gulp');
var cucumber = require('./');


gulp.task('cucumber', function() {
    gulp.src('features/*').pipe(cucumber({
        'steps': 'features/steps/steps.js'
    }));
});

gulp.task('default', function() {
    gulp.run('cucumber');
    gulp.watch('features/*', ['cucumber']);
});
