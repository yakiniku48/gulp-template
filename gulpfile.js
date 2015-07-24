/*!
 * guplfile template
 * Copyright 2015 Hideyuki MOTOO
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

var gulp = require( "gulp" );

var autoprefixer = require( "gulp-autoprefixer" );
var cached       = require( "gulp-cached" );
var imagemin     = require( "gulp-imagemin" );
var plumber      = require( "gulp-plumber" );
var sass         = require( "gulp-ruby-sass" );
var uglify       = require( "gulp-uglify" );
var pngquant     = require( "imagemin-pngquant");

gulp.task( "default", function () {
	gulp.watch( "./assets/src/js/**/*.js", [ "js" ] );
	gulp.watch( "./assets/src/sass/**/*.scss", [ "sass" ] );
} );

gulp.task( "sass", function () {
	return sass( "./assets/src/sass/", { compass: true, style: 'expanded' })
		.pipe( plumber() )
		.pipe( cached( "sass" ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( "./assets/css" ) );
} );
gulp.task( "js", function () {
	return gulp.src( "./assets/src/js/**/*.js" )
		.pipe( uglify() )
		.pipe( gulp.dest( "./assets/js" ) );
});

/* defaultには追加しない（だって時間的コスト大きいやん） */
gulp.task( "imagemin", function () {
	return gulp.src( "./assets/src/img/**/*" )
	.pipe( imagemin( {
		progressive: true,
		svgoPlugins: [ { removeViewBox: false } ],
		use: [ pngquant( { quality: '60-80' } ) ]
	} ) )
	.pipe( gulp.dest( "./assets/img" ) );
});