/**
 * Created by Administrator on 2016/7/31 0031.
 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var jsmin = require('gulp-uglify');

gulp.task('default',['ES6toES5','imagemin','cleancss','htmlmin','copy'],function(){
    console.log('gulp任务执行完毕');
});

gulp.task('ES6toES5',function(){
    gulp.src(['./src/controllers/*.js','./src/models/*.js','./src/router/*.js','./src/static/js/*.js'],{base : 'src'})
        .pipe(babel({
            "presets": ["es2015"]
        }))
        .pipe(jsmin())
        .pipe(gulp.dest('dist'));
    console.log('ES6转化成功');
});

var imagemin = require('gulp-imagemin');
gulp.task('imagemin',function(){
    gulp.src(['./src/static/images/*.*','./src/static/upload/*.*'],{base : 'src'})
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
    console.log('图片压缩完毕');
});



var rev = require('gulp-rev');
var cleancss = require('gulp-clean-css');
var fs = require('fs');
gulp.task('cleancss',function(){
    gulp.src('./src/static/css/*.css',{base : 'src'})
        .pipe(cleancss())
        //让静态文字加上MD5后缀

        .pipe(rev())

        .pipe(gulp.dest('dist'))
        //生成对应的manifest文件，记录名字间的映射关系
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src/rev'));
    console.log('css压缩完毕,生成了mainfest文件');

    
});



var htmlmin = require('gulp-htmlmin');
var revCollector = require('gulp-rev-collector');
gulp.task('htmlmin',function(){
    var str = fs.readFileSync('./src/rev/rev-manifest.json').toString();
    var reg = /static\//gi;
    var newStr = str.replace(reg,'');
    console.log(newStr);
    fs.writeFileSync('./src/rev/rev-manifest2.json', newStr);
    //拿到rev产生的名字映射关系json
    gulp.src(['./src/rev/rev-manifest2.json','./src/views/*.html'],{base : 'src'})
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        //把MD5的名字替换上
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
    console.log('html压缩完毕');
});

var copy = require('gulp-copy');
gulp.task('copy',function(){
	gulp.src(['./src/static/bowersrc/**/*.*','./src/*.js'],{base:'src'})
		.pipe(copy('dist',{prefix:1}))
	console.log('复制文件成功');
});






