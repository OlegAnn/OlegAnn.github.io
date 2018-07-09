module.exports = function () {
	$.gulp.task('pug', function() {
		return $.gulp.src($.paths.pug)
      .pipe($.gp.plumber())
			.pipe($.gp.pug())
			.pipe($.gulp.dest("./"))
			.on('end', $.browserSync.reload);
	});
};
