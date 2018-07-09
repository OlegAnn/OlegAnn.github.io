module.exports = function () {
	$.gulp.task('watch', function () {	
		$.gulp.watch('src/pug/**/*.pug', $.gulp.series('pug'))
		$.gulp.watch($.paths.sass, $.gulp.series('sass'))
		$.gulp.watch($.paths.js, $.gulp.series('scripts'))
    $.gulp.watch('src/img/*', $.gulp.series('img:dev'))
    // gulp without pug
		// $.gulp.watch('app/*.html')
	});
};
