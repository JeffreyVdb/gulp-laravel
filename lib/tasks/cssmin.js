"use strict";

module.exports = function (task) {
  task.setRequirements(['gulp-csso']);
  task.exec(function () {
    var laravel = this.getLaravel(),
        gulp = laravel.getGulp(),
        baseDir = laravel.config.cssOutput,
        cssFiles = baseDir + '/**/*.css';

    if (laravel.config.production) {
      return gulp.src(cssFiles)
        .pipe(task.plugins.csso())
        .pipe(gulp.dest(baseDir));
    }

    laravel.notifier.message('Not in production environment, not minimizing css');
  });
};
