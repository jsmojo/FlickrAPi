var express = require('express'),
   path = require('path'),
   logger = require('morgan'),
   cookieParser = require('cookie-parser'),
   bodyParser = require('body-parser'),
   routes = require('./routes/index'),
   gulp = require('gulp'),
   gutil = require('gulp-util'),
   coffee = require('gulp-coffee'),
   browserify = require('gulp-browserify'),
   compass = require('gulp-compass'),
   sass = require('gulp-ruby-sass'),
   minifyCSS = require('gulp-minify-css'),
   connect = require('gulp-connect'),
   gulpif = require('gulp-if'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next)  {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

///////////////
//Gulp Process
///////////////

var coffeeSources = ['builds/development/scripts/coffee/*.coffee'];
var jsSources = ['builds/development/scripts/js/common.js',
                 'builds/development/scripts/js/angRoutes.js',
                 'builds/development/scripts/js/angContlrs.js',
                 'builds/development/scripts/coffee/*.js'];
var sassSources = ['builds/development/styles/sass/main.scss'];
var cssSources =  ['builds/development/styles/css/*.css',
                   'builds/development/styles/sass/*.css'];



gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log)) 
    .pipe(gulp.dest('builds/development/scripts/coffee'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('common.js'))
    .pipe(browserify( { debug : true }))
    //.pipe(gulp.dest('builds/development/gulp_scripts'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('builds/production/scripts'));
});

gulp.task('sass', function() {
  return sass(sassSources, {style: 'expanded', lineNumbers: true})
      .on('error', gutil.log)
    //.pipe(concat('common.css'))
    .pipe(gulp.dest('builds/development/styles/sass/'));
    //.pipe(livereload());
});

gulp.task('minifyCSS',function() {
  gulp.src(cssSources)
    .pipe(minifyCSS())
    .pipe(gulp.dest('builds/production/styles'));
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(cssSources, ['minifyCSS']);
});


gulp.task('default', ['coffee', 'js', 'sass','minifyCSS','watch','minifyCSS']);



module.exports = app;
