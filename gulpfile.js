'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var watch = require('gulp-watch');

// for serving the app
var http = require('http');
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static');

// add custom browserify options here
var customOpts = {
    entries: ['./src/index.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/js'));
}

gulp.task('static', function () {
    gulp.src('./static/**', {base: './static'})
      .pipe(gulp.dest('./dist'));
});

gulp.task('stylesheets', function () {
    gulp.src('./stylesheets/**', {base: './stylesheets'})
      .pipe(gulp.dest('./dist/css'));
});

gulp.task('serve', function () {
    var serve = serveStatic('dist', {'index': ['index.html']});

    // Create server
    var server = http.createServer(function (req, res) {
        var done = finalhandler(req, res);
        serve(req, res, done);
    });

    // Listen
    var port = 3000;
    server.listen(3000);
    console.log("server listening on port", port);
});

gulp.task('watch', ['static', 'stylesheets'], function () {
    gulp.watch(['static/**'], ['static']);
    gulp.watch(['./stylesheets/**'], ['stylesheets']);
});

gulp.task('live', ['serve', 'watch', 'js']);
