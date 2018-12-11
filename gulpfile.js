/*!
 * guplfile template
 * Copyright 2019 Hideyuki MOTOO
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
 
gulp.task( "default", function () {
  return gulp.watch( "assets/src/scss/**/*.scss", function () {
    return gulp.src( "assets/src/scss/style.scss" )
      .pipe(
        sass( {
          outputStyle: "expanded"
        } ).on( "error", sass.logError )
      )
      .pipe( gulp.dest( "assets/css" ) );
  } );
});
