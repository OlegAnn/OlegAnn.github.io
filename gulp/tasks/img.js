module.exports = function () {
    $.gulp.task('img:dev', function() {
        return $.gulp.src('src/img/**/*')
            .pipe($.gulp.dest('build/static/img/'));
    });
    $.gulp.task('img:build', function() {
        return $.gulp.src('src/img/**/*')
            .pipe($.gp.tinypng('uGJSFvi63AeEwPzxaNqWrLr3pzo8G0Of'))
            .pipe($.gulp.dest('build/static/img/'));
    });
};
