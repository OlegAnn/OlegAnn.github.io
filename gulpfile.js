global.$ = {
	gulp: require('gulp'),
	gp : require('gulp-load-plugins')(),
	browserSync : require('browser-sync').create(),
	path: {
		tasks: require('./gulp/config/tasks.js')
  },
	paths: {
    sass: ['src/scss/**/*.+(scss|sass)'],
    images: ['src/images/*'],
    html: ['*.html'],
    pug: ['src/pug/pages/*.pug'],
    js: ['src/js/*.js']
	}
};

$.path.tasks.forEach(function (taskPath) {
	require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
	$.gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts', 'img:dev'),
  $.gulp.parallel('watch', 'serve')
));
$.gulp.task('build', $.gulp.series(
    $.gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts', 'img:build',
        'svg'),
    $.gulp.parallel('watch', 'serve', 'uglify')
));





