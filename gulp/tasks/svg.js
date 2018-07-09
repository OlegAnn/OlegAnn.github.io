module.exports = function () {
    $.gulp.task('svg', function() {
        return $.gulp.src('src/img/svg/*.svg')
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.replace('&gt;', '>'))
            .pipe($.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: 'sprite.svg'
                    }
                }
            }))
            .pipe($.gulp.dest('./build/static/img/svg/'));
    });
};



//
// function multiply() {
//     window.nubmer.forEach(function (item,i,number) {
//         if(i%2>0){
//             console.log(item.value)
//         }
//
//     })
//
// }
// multiply();
// let multiply = function multiply() {
//     let sum = window.nubmer.reduce(function (sum,current,i) {
//         if(i%2>0){
//             return sum + current.value
//         }
//     },0)
//     return multiply
//     console.log(sum)
// }
// multiply()