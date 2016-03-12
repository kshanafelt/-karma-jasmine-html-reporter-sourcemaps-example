var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named')
var del = require('del');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

gulp.task('build', function () {
  return gulp.src('src/entry.js')
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['clean', 'setup', 'build'], function () {
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