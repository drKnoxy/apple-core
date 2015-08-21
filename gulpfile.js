var del = require('del');
var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');


var handleError = function(err) {
	gutil.log(gutil.colors.red('# Error in ' + err.plugin));
	gutil.log('File: %s:%s', err.fileName, err.lineNumber);
	gutil.log('Error Message: %s', err.message);
	gutil.beep();
}


gulp.task('styles', function () {
	return gulp.src('./source/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(plumber(handleError))
		.pipe(autoprefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		// .pipe(minifyCSS({
		//     processImport: false
		// }))
		.pipe(sourcemaps.write('./dist/maps'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
	gulp.watch('./source/**/*.scss', ['styles']);
});

gulp.task('default', ['styles'], function(){
	gulp.start('watch');
});