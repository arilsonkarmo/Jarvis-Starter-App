/**
 * Requires
 */
var gulp = require('gulp');
    gutil = require('gulp-util'),
    bower = require('bower'),
    sh = require('shelljs'),
    fs = require('fs')
    application = require('./gulp.config');

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

/**
 * Tasks
 */

/**
 * Get your index.html configs
 */
gulp.task('usemin', function (done) {
    gulp.src('./source/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.usemin({
            css: [plugins.sass({errLogToConsole: true}), plugins.if(application.env == 'production', plugins.minifyCss()), 'concat'],
            cssapp: [plugins.sass({errLogToConsole: true}), plugins.if(application.env == 'production', plugins.minifyCss()), 'concat'],
            jsvendor: [plugins.uglify(), plugins.if(application.env == 'production', plugins.rev())],
            jsapp: [plugins.uglify(), plugins.if(application.env == 'production', plugins.rev())]
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest))
        .on('end', done);
});

/**
 * Get your index.html configs
 */
gulp.task('cssvendors', function (done) {
    gulp.src('./source/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.usemin({
            cssapp: [plugins.sass({errLogToConsole: true}), plugins.if(application.env == 'production', plugins.minifyCss()), 'concat']
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest))
        .on('end', done);
});

/**
 * Get your index.html configs
 */
gulp.task('cssapp', function (done) {
    gulp.src('./source/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.usemin({
            cssapp: [plugins.sass({errLogToConsole: true}), plugins.if(application.env == 'production', plugins.minifyCss()), 'concat']
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest))
        .on('end', done);
});

/**
 * Get your index.html configs
 */
gulp.task('jsvendors', function (done) {
    gulp.src('./source/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.usemin({
            jsvendor: [plugins.uglify(), plugins.if(application.env == 'production', plugins.rev())]
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest))
        .on('end', done);
});

/**
 * Get your index.html configs
 */
gulp.task('jsapp', function (done) {
    gulp.src('./source/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.usemin({
            jsapp: [plugins.uglify(), plugins.if(application.env == 'production', plugins.rev())]
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest))
        .on('end', done);
});

/**
 * Get your .htlm or jade files and optime to angular template cache
 */
gulp.task('templates', function (done) {
    gulp.src(application.paths.templates)
        .pipe(plugins.plumber())
        .pipe(plugins.if(/[.]jade$/, plugins.jade()))
        .pipe(plugins.angularHtmlify())
        .pipe(plugins.angularTemplatecache({
            standalone: false,
            module: application.applicationName
        }))
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest + '/js'))
        .on('end', done);
});

/**
 * Copy your fonts
 */
gulp.task('fonts', function (done) {
    gulp.src(application.paths.fonts)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(application.basePaths.dest + '/fonts'))
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest + '/fonts'))
        .on('end', done);
});

/**
 * Copy your images
 */
gulp.task('images', function () {
    gulp.src(application.paths.images)
        .pipe(plugins.plumber())
        .pipe(plugins.changed(application.basePaths.dest + '/images'))
        .pipe(plugins.imagemin())
        .pipe(plugins.size())
        .pipe(gulp.dest(application.basePaths.dest + '/images'));
});

gulp.task('constants', function () {
    gulp.src('config.json')
        .pipe(plugins.ngConfig(application.applicationName, {
            environment: application.env,
            createModule: false
        }))
        .pipe(gulp.dest(application.basePaths.dest + '/js'));
});

gulp.task('default', ['cssvendors', 'cssapp', 'jsvendors', 'jsapp', 'templates', 'images', 'fonts', 'constants']);

gulp.task('watch', ['usemin', 'images', 'templates', 'fonts', 'constants'], function() {

    gulp.watch(['source/index.html', application.paths.sass, application.paths.scripts], ['usemin']);
    gulp.watch(application.paths.images, ['images']);
    gulp.watch(application.paths.templates, ['templates']);
    gulp.watch(application.paths.fonts, ['fonts']);
    gulp.watch('config.json', ['constants']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
