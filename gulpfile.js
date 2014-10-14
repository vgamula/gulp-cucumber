var gulp 	 = require('gulp');
var cucumber = require('./');


gulp.task('cucumber', function () {
	gulp.src('features/*').pipe(cucumber({}));
});

gulp.task('default', function () {
	gulp.run('cucumber');
	gulp.watch('features/*', function (event) {
		gulp.run('cucumber');
	});
});


