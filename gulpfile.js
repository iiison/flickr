var gulp			= require('gulp'),
	sass			= require('gulp-sass'),
	uglify			= require('gulp-uglify'),
	concat			= require('gulp-concat'),
	declare			= require('gulp-declare'),
	minifyCSS		= require('gulp-minify-css'),
	handlebars 	= require('gulp-handlebars'),
	defineModule	= require('gulp-define-module');

var uglifyConfigs = {
	mangle 	: true,
	compress 	: {
		drop_console : true
	},
};

var paths = {
	css: 'styles/scss/',
	templates: 'templates/**/*.tpl',
	js: {
		lib: 'js/lib/*.js',
		file: 'js/*.js'
	}
};

gulp.task('sassy', function () {
	return gulp.src(paths.css + 'main.scss')
		.pipe(sass({errLogToConsole: true}))
		.pipe(minifyCSS())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('buildtpl', function(){
	return gulp.src([paths.templates])
		.pipe(handlebars().on('error', function (e) {
			console.log(e);
		}))
		.pipe(defineModule('plain'))
		.pipe(declare({
			namespace: 'templates'
		}))
		.pipe(uglify(uglifyConfigs).on('error', function(e){
			console.log(e);
		}))
		.pipe(concat('templates.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('buildjs', function(){
	return gulp.src([paths.js.file])
		/*.pipe(uglify(uglifyConfigs).on('error', function(e){
			console.log(e);
		}))*/
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('dist/'));
});
gulp.task('buildlibs', function(){
	return gulp.src([paths.js.lib])
		.pipe(uglify(uglifyConfigs).on('error', function(e){
			console.log(e);
		}))
		.pipe(concat('all.lib.min.js'))
		.pipe(gulp.dest('dist/'));
});
gulp.task('watch', function () {
	gulp.watch('styles/scss/**/*.scss', ['sassy']);
	gulp.watch(paths.js.file, ['buildjs']);
	gulp.watch(paths.templates, ['buildtpl']);
});