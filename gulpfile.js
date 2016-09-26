var gulp = require('gulp');
var connect = require('gulp-connect');
var autoupdater = require('gulp-livereload');
var sass = require('gulp-sass');
var concating = require('gulp-concat');
var prefixer = require('gulp-autoprefixer');

gulp.task('all', function(){
  gulp.src('./src/')
  .pipe(gulp.dest('./build/'))
})

gulp.task('sass', function(){
  gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css/'))
    .pipe(connect.reload())
});

gulp.task('concat', function(){
  gulp.src(['./src/js/jquery310.js','./src/js/*.js'])
    .pipe(concating('script.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(connect.reload())
});

gulp.task('prefix', function(){
  gulp.src('./build/css/')
    .pipe(prefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./build/css/'))
    .pipe(connect.reload())
});

gulp.task('connect', function(){
  connect.server({
    root: 'build',
    livereload : true
  })
});

gulp.task('watch', function(){
  gulp.watch('./src/*.html',['html']);
  gulp.watch('./src/sass/*.scss', ['sass']);
  gulp.watch('./build/css/', ['prefix']);
  gulp.watch('./src/js/*.js', ['concat'])
});

gulp.task('default',['connect','watch', 'sass', 'prefix', 'concat']);
