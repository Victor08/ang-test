/**
 * Plugins
 */
var gulp          = require('gulp'),
    plumber       = require('gulp-plumber'),
    less          = require('gulp-less'),
    sourcemaps    = require('gulp-sourcemaps'),
    _             = require('lodash'),
    fs            = require('fs'),
    merge         = require('merge-stream');


/**
 * Paths
 */
var resources     = './resources',
    public_css    = './public/stylesheets',
    public_vendor = './public/vendor';

gulp.task('default', function () {
    gulp.watch(resources + '/less/**/*.less', ['less']);
});

/**
 * Tasks
 */
gulp.task('default',['less','public'], function () {
    gulp.watch(resources + '/less/**/*.less', ['less']);
});
gulp.task('less', function () {
    return gulp.src(resources + '/less/index.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less({compress: true, sourceMap: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(public_css));
});

gulp.task('public', function () {
    var config = require('./bower.json')
        , bowerrc = JSON.parse(fs.readFileSync('./.bowerrc'));

    var tasks = _.flatten(_.map(config.public, function (includes, name) {
        return _.map(includes, function (path) {
            return gulp.src('./' + bowerrc.directory + '/' + name + '/' + path)
                .pipe(gulp.dest(public_vendor + '/' + name));
        });
    }));

    return merge(tasks);
});