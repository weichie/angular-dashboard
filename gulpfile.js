// Load all the modules from package.json
var gulp = require( 'gulp' ),
  plumber = require( 'gulp-plumber' ),
  watch = require( 'gulp-watch' ),
  livereload = require( 'gulp-livereload' ),
  minifycss = require( 'gulp-minify-css' ),
  jshint = require( 'gulp-jshint' ),
  stylish = require( 'jshint-stylish' ),
  uglify = require( 'gulp-uglify' ),
  rename = require( 'gulp-rename' ),
  notify = require( 'gulp-notify' ),
  include = require( 'gulp-include' ),
  sass = require( 'gulp-sass' );
  browserSync = require('browser-sync').create();


// Default error handler
var onError = function( err ) {
  console.log( 'An error occured:', err.message );
  this.emit('end');
}


// Jshint outputs any kind of javascript problems you might have
// Only checks javascript files inside /src directory
gulp.task( 'jshint', function() {
  return gulp.src( './js/src/*.js' )
    .pipe( jshint( '.jshintrc' ) )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( 'fail' ) );
})


// Concatenates all files that it finds in the manifest
// and creates two versions: normal and minified.
// It's dependent on the jshint task to succeed.
gulp.task( 'scripts', ['jshint'], function() {
  return gulp.src( './js/manifest.js' )
    .pipe( include() )
    .pipe( rename( { basename: 'scripts' } ) )
    .pipe( gulp.dest( './js/dist' ) )
    // Normal done, time to create the minified javascript (scripts.min.js)
    // remove the following 3 lines if you don't want it
    .pipe( uglify() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './js/dist' ) )
    .pipe( livereload() );
} );

// As with javascripts this task creates two files, the regular and
// the minified one. It automatically reloads browser as well.
gulp.task('scss', function() {
  return gulp.src('./scss/style.scss')
    .pipe( plumber( { errorHandler: onError } ) )
    .pipe( sass() )
    .pipe( gulp.dest( '.' ) )
    // Normal done, time to do minified (style.min.css)
    // remove the following 3 lines if you don't want it
    .pipe( minifycss() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( '.' ) )
    .pipe( livereload() );
});

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

gulp.task('styles', function() {
  return sass('public/sass', { style: 'expanded' })
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets/'));
});

// Start the livereload server and watch files for change
gulp.task( 'watch', function() {
  livereload.listen();

  // don't listen to whole js folder, it'll create an infinite loop
  gulp.watch( [ './js/**/*.js', '!./js/dist/*.js' ], [ 'scripts' ] )

  gulp.watch( './sass/**/*.scss', ['scss'] );
  gulp.watch('public/sass/*.scss', ['styles']);



  gulp.watch( './**/*.php' ).on( 'change', function( file ) {
    // reload browser whenever any PHP file changes
    livereload.changed( file );

    /*browserSync.init({
        server: {
            baseDir: "./"
        }
    });*/

    browserSync.reload;
  } );
} );

gulp.task('serve', function() {
	browserSync.init({
        //proxy: "weichie/appspark/"
        server: './'
    });

    //gulp.watch("*.php").on("change", browserSync.reload);
    gulp.watch("assets/css/*.css").on("change", browserSync.reload);
    gulp.watch("assets/sass/*.scss").on("change", browserSync.reload);
    gulp.watch("assets/js/*.js").on("change", browserSync.reload);
    gulp.watch("*.html").on("change", browserSync.reload);
});


gulp.task( 'default', ['watch', 'serve'], function() {
 // Does nothing in this task, just triggers the dependent 'watch'
} );