'use strict'

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		maps = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer'),
		del = require('del'),
		babel = require("gulp-babel"),
		cleanCSS = require('gulp-clean-css');
	

gulp.task('clean', function(cb) {
    del(['js/**'], cb);
});

gulp.task("concatScripts", function(){
		return gulp.src([
			'src/javascript/moment.js',
			'node_modules/moment-timer/lib/moment-timer.js',
			'src/javascript/main.js'])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))		
		.pipe(gulp.dest('js'));
});

gulp.task("transpile", ["concatScripts"], function () {
	  return gulp.src("js/app.js")
	    .pipe(babel())
	    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["transpile"], function(){
	return gulp.src("js/app.js")
		.pipe(uglify().on('error', function(e){
		            console.log(e);
		         }))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
	return gulp.src("src/sass/styles.scss")
	.pipe(maps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task("minifyCss", ["compileSass"], function(){
	return gulp.src("css/styles.css")
	    .pipe(cleanCSS({compatibility: 'ie8'}))
	    .pipe(rename('styles.min.css'))
	    .pipe(gulp.dest('docs/css'));	
});

gulp.task('watchFiles', function() {
	gulp.watch('src/sass/**/*.scss', ['compileSass']);
	gulp.watch('src/javascript/main.js', ['concatScripts'])
});

gulp.task('build', ["minifyScripts", "minifyCss"], function(){
	console.log("Remember to change index.html links to minified versions");
	return gulp.src(["js/app.min.js", "index.html", "img/**", "fonts/**", "audio/**"] , { base: "./"})
			.pipe(gulp.dest('docs'));
});