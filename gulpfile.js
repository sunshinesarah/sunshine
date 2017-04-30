'use-strict'

var
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    util = require('gulp-util'),
    open = require('gulp-open'),
    concat = require('gulp-concat'),
    karma = require('karma'),
    protractor = require('gulp-protractor'),
    runSequence = require('run-sequence'),
    Dgeni = require('dgeni'),
    del = require('del');

gulp.task('default', function(callback){
    runSequence('clean',['copy', 'copy-scripts','copy-css', 'coffee'], 'connect', 'watch', 'open-app', callback);
});

gulp.task('build-docs', ['dgeni-clean', 'dgeni', 'dgeni-movefiles']);

gulp.task('coffee', function() {
    return gulp.src('scripts/hello.coffee')
        .pipe(coffee({bare: true})
            .on('error', util.log))
        .pipe(gulp.dest('assets/scripts',{cwd: '.tmp'}))
});

gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe(connect.reload())
});

gulp.task('copy', function() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('assets',{cwd: '.tmp'}))
});

gulp.task('copy-css', function() {
    return gulp.src(['app/bootstrap.min.css', 'app/app.css'])
        .pipe(gulp.dest('assets/styles',{cwd: '.tmp'}))
});


gulp.task('copy-scripts', function() {
    return gulp.src([
        'app/**/*.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-messages/angular-messages.js',
        'node_modules/angular-material/angular-material.js'
    ]).pipe(gulp.dest('assets/scripts',{cwd: '.tmp'}))
});


gulp.task('js', function() {
    return gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('assets',{cwd: '.tmp'}))
});

gulp.task('watch', function() {
    gulp.watch('scripts/hello.coffee', ['coffee']);
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/app.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('./app/app.scss')
        .pipe(sass({style: 'expanded'}))
        .on('error', util.log)
        .pipe(gulp.dest('assets/styles',{cwd: '.tmp'}))
});


gulp.task('connect', function() {
    return connect.server({
        root: '.',
        livereload: true
    })
});

gulp.task('open-app', function(){
    var options = {
        uri: 'http://localhost:8080/.tmp/assets',
        app: 'Google Chrome'
    };
    return gulp.src('').pipe(open(options));
});

gulp.task('dgeni', function(){
    var dgeni = new Dgeni([require('./docs/config')]);
    return dgeni.generate();
});

gulp.task('dgeni-clean', function(){
    return gulp.src([
        'docs/app/*.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'docs/styles/*.css'
    ]).pipe(gulp.dest('docs/src',{cwd: '.tmp'}))
});

gulp.task('clean', function(done) {
    return del(['.tmp'], done);
});


gulp.task('exit', function(){
    return process.exit();
});
