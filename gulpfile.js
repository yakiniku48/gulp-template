/*!
 * guplfile template
 * Copyright 2015 Hideyuki MOTOO
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

var gulp = require( "gulp" );

var autoprefixer = require( "gulp-autoprefixer" );
var cached		 = require( "gulp-cached" );
var browserSync	 = require( "browser-sync" );
var imagemin	 = require( "gulp-imagemin" );
var plumber		 = require( "gulp-plumber" );
var pngquant	 = require( "imagemin-pngquant");
var sass		 = require( "gulp-ruby-sass" );
var uglify		 = require( "gulp-uglify" );

gulp.task( "default", [ "browser-sync" ], function () {
	gulp.watch( "./assets/src/js/**/*.js", [ "js" ] );
	gulp.watch( "./assets/src/sass/**/*.scss", [ "sass" ] );
	gulp.watch( "./**/*.html", [ "browser-reload" ] );
	gulp.watch( "./**/*.css",  [ "browser-reload" ] );
	gulp.watch( "./**/*.js",   [ "browser-reload" ] );
} );

gulp.task( "js", function () {
	return gulp.src( "./assets/src/js/**/*.js" )
		.pipe( uglify() )
		.pipe( gulp.dest( "./assets/js" ) );
} );
gulp.task( "sass", function () {
	return sass( "./assets/src/sass/", { compass: true, style: 'expanded' })
		.pipe( plumber() )
		.pipe( cached( "sass" ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( "./assets/css" ) );
} );
gulp.task( "browser-reload", function () {
	browserSync.reload();
} );
gulp.task( "browser-sync", function () {
	browserSync( {
		server: {
			baseDir: "./"
		}
	});
} );

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