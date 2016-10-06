var gulp           = require('gulp'),
    gutil          = require('gulp-util' ),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'),
    del            = require('del'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant'),
    cache          = require('gulp-cache'),
    autoprefixer   = require('gulp-autoprefixer'),
    fileinclude    = require('gulp-file-include'),
    gulpRemoveHtml = require('gulp-remove-html'),
    bourbon        = require('node-bourbon'),
    ftp            = require('vinyl-ftp'),
    notify         = require("gulp-notify");

var config = {
    jade : "app/jade",
    sass : "app/sass",

}
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('libs', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        // 'app/libs/magnific-popup/magnific-popup.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('default', ['watch']);



// gulp.task("jade",function(){
//     return gulp.src(config.jade+"/*/*.jade")
//         .pipe(jade())
//         .pipe(gulp.dest("app/html/"))
//
// });
