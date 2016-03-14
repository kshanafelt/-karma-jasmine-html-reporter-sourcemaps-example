var gulp = require('gulp');
var Server = require('karma').Server;
var webpack = require('webpack-stream');
var named = require('vinyl-named')
var del = require('del');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

const webpackconfig = { devtool: 'inline-source-map' }

gulp.task('default', ['clean', 'setup', 'build'], function () {
});

gulp.task('build', function () {
  return gulp.src('src/entry.js')
    .pipe(named())
    .pipe(webpack(webpackconfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('test', function (done) {
  new Server({
    //configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true,
    reporters: ['karma-jasmine-html-sourcemaps'],
    
    browsers : ['Chrome'],// 'Firefox'],
    frameworks: ['jasmine'],
    files: ['test/*_test.js', 'test/**/*_test.js'],
    preprocessors: {
            // add webpack as preprocessor
            'test/*_test.js': ['webpack', 'sourcemap'],
            'test/**/*_test.js': ['webpack', 'sourcemap']
        },
     webpack: webpackconfig,
     plugins: [
         'karma-jasmine',
         'karma-webpack',
         'karma-sourcemap-loader',
         'karma-chrome-launcher',
         
         // todo: replace with npm name when it becomes an npm package
         require('../karma-jasmine-html-reporter-sourcemaps/src/index.js')
     ],
  }, done).start();
});

gulp.task('watch', function () {
  gulp.watch('lib/*.js', ['default']);
});

gulp.task('setup', function (done) {
  var lib = path.join(__dirname, 'lib');
  mkdirp(lib, function () {
    for (var i = 0; i < 99; i++) {
      fs.writeFileSync(path.join(lib, 'file' + i + '.js'), 'module.exports = "' + i + '";');
    }
    done();
  });
});

gulp.task('clean', function () {
    return del.sync(['lib/**', 'dist/**']);
});