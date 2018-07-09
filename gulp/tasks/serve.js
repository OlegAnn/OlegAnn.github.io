module.exports = function () {
	$.gulp.task('serve', function() {
		$.browserSync.init({
		    server: {
		        baseDir: "./"
						// gulp without pug
						// baseDir: './'
		    }
		});
	});
};
