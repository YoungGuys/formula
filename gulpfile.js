var   gulp         = require('gulp')
    , notify       = require("gulp-notify")
    , connect      = require('gulp-connect')
    ;

//server
gulp.task('server', function() {
    connect.server({
        livereload: true
    });
});


//html
gulp.task('html',function(){
    gulp.src('index.html')
        .pipe(connect.reload())
        .pipe(notify("Change index.html"));
});

//js
gulp.task('js', function() {
    gulp.src('./js/**/*.js')
        .pipe(connect.reload());
});




//concat
gulp.task('concat-js', function() {
    return gulp.src([
            './lib/js/app.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./lib/js/'));
});


//watch
gulp.task('watch', function () {
    gulp.watch('./index.html', ['html']);
    gulp.watch('./js/**/*', ['js']);
});



//compress js
//gulp.task('compress-js', function() {
//    gulp.src('./public/js/*')
//        .pipe(uglify())
//        .pipe(gulp.dest('./public/js/'))
//});



gulp.task('default', ['server', 'html', 'js', 'watch']);
