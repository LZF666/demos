var gulp = require('gulp');
var rev = require('gulp-rev')
var revReplace = require('gulp-rev-replace')
var useref = require('gulp-useref') //解析html资源定位
var cssnano = require('gulp-cssnano');//css压缩
var concat = require('gulp-concat');//c合并
var uglify = require('gulp-uglify')//js压缩
var rename = require('gulp-rename')//重命名
var clean = require('gulp-clean')//清空文件夹
var minhtml = require('gulp-htmlmin')//html压缩
// var jshint = require('gulp-jshint')//js代码规范性检查
var imagemin = require('gulp-imagemin')//图片压缩


gulp.task('html',function(){
    return gulp.src('./*.html')
            .pipe(minhtml({collapseWhitespace:true}))
            .pipe(gulp.dest('dist'));
});

gulp.task('css',function(){
    gulp.src('./src/css/*.css')
            .pipe(concat('index-merge.css'))
            .pipe(cssnano())
            .pipe(gulp.dest('dist/css/'));
});
gulp.task('js',function(){
    gulp.src('./src/js/*.js')
            .pipe(concat('js-merge.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'));
});
gulp.task('img',function(){
    gulp.src('./imgs/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/imgs'));
});
gulp.task('revision',['css','js'],function(){
    return gulp.src(['dist/**/*.css','dist/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'))
})
gulp.task('index', ['revision'], function(){
    var manifest = gulp.src('./dist/rev-manifest.json');
    return gulp.src('src/index.html')
    .pipe(revReplace({
        manifest: manifest
    }))
    .pipe(useref())
    .pipe(gulp.dest('dist'))
})
gulp.task('build',['html','css','js','img']);
