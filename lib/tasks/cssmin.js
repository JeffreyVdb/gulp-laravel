"use strict";

module.exports = function (task) {
  task.setRequirements(['gulp-csso']);
  task.exec(function () {
    var laravel = this.getLaravel(),
        gulp = laravel.getGulp(),
        baseDir = laravel.config.cssOutput,
        cssFiles = baseDir + '/**/*.css';

    return gulp.src(cssFiles)
      .pipe(task.plugins.csso())
      .pipe(gulp.dest(baseDir));
  });
};
