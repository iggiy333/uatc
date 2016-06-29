// Include gulp
var gulp = require('gulp');

// Plugins
var watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),  
	cleanCSS = require('gulp-clean-css'),
	livereload = require('gulp-livereload'),
	inject = require('gulp-inject');

// Paths
var paths = {
				html: 	[
							'./views/**/*.html'
						],
				css:  	[
							'./styles/dependencies/**/*.css',
	    					'./styles/**/*.css'
	    				],
				sass: 	['./styles/sass/**/*.sass'],
				js: 	[	'./scripts/**/angular.min.js', 
	    					'./scripts/dependencies/*.js', 
	    					'./scripts/**/app.js',
	    					'./scripts/public/services/*.js',
	    					'./scripts/public/controllers/*.js',
	    					'./scripts/**/*.js'
	    				]
			};

gulp.task('inject-index', function(){
	var target = gulp.src('index.html'),
	    sources = gulp.src([

	    					/*** SCRIPTS ***/
	    					'./scripts/**/angular.min.js', 
	    					'./scripts/dependencies/*.js', 
	    					'./scripts/**/app.js',
	    					'./scripts/public/services/*.js',
	    					'./scripts/public/controllers/*.js',
	    					'./scripts/**/*.js',

	    					/***  STYLES ***/
	    					'./styles/dependencies/**/*.css',
	    					'./styles/**/*.css'
	    					], {read: false})
	;
	return target
		.pipe(inject(sources, {relative: true}))
		.pipe(gulp.dest('./'))
	;
});

gulp.task('sass', function(){
	return gulp.src('./styles/sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass({
			style: 'compressed'
		}))
		.pipe(livereload())		
		.pipe(gulp.dest('./styles/css'))
	;
});

gulp.task('minify-css', function(){
	return gulp.src('./styles/css/**/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
	//	.pipe(livereload())
		.pipe(gulp.dest('./build/styles'))
	;
});

gulp.task('uglify-scripts', function(){
	gulp.src('./scripts/**/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('/build/js/'))
	;
});

// when files are changes that are being watched, array of tasks are being fired
gulp.task('watch', function(){
	gulp.watch('/styles/sass/*.sass', ['sass', 'minify-css']);
	gulp.watch('/scripts/public/**/*.js', ['uglify-scripts']);
});

gulp.task('default', ['inject-index', 'uglify-scripts', 'sass', 'minify-css']);



