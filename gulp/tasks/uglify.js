module.exports = function () {
	return $.gulp.task('uglify', function() {
	  $.gulp.src('build/static/js/index.js')
		.pipe($.gp.uglify())
		.pipe($.gulp.dest('build/static/js/'))
	});
};
