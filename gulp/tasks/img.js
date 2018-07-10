module.exports = function () {
    $.gulp.task('img:dev', function() {
        return $.gulp.src('src/img/**/*')
            .pipe($.gulp.dest('build/static/img/'));
    });
    $.gulp.task('img:build', function() {
        return $.gulp.src('src/img/**/*')
            .pipe($.gp.tinypng('E6OlospnYtXUo7C3MPsaaFeXeukjHcOM'))
            .pipe($.gulp.dest('build/static/img/'));
    });
};
