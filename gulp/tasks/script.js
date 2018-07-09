module.exports = function () {
	$.gulp.task('scripts:lib', function() {
	 return $.gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/slick-carousel/slick/slick.min.js'])
    .pipe($.gp.plumber())
    .pipe($.gp.babel({
        presets: ['env']
    }))
    .pipe($.gp.concat('libs.min.js'))
		.pipe($.gulp.dest('build/static/js'))
		.pipe($.browserSync.reload({
			stream:true
		}));
	});

	$.gulp.task('scripts', function() {
	 return $.gulp.src('src/js/index.js')
    .pipe($.gp.plumber())
    .pipe($.gp.babel({
        presets: ['env']
    }))
		.pipe($.gulp.dest('build/static/js/'))
		.pipe($.browserSync.reload({
			stream:true
		}));
	});
};
