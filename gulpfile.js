var gulp = require('gulp'),
    jade = require("gulp-jade"),
    sass = require("gulp-sass");


var config = {
    jade : "app/jade",
    sass : "app/sass",

}
gulp.task("jade",function(){
    return gulp.src("app/jade/*/*.jade")
        .pipe(jade())
        .pipe(gulp.dest("app/html/"))

})