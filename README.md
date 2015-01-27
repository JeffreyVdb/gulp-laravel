# Easy gulp implementation for laravel

Laravel gulp is simply an implementation that aims to make it easy for users that are new to gulp to be able to maintain their gulpfile by adding modules that work out of the box.

## Example gulpfile.js

```javascript
"use strict";

var gulp    = require('gulp'),
    Laravel = require('gulp-laravel');

// Example task (external module)
Laravel.addTask('autoprefixer', require('gulp-laravel-autoprefixer'));

gulp.task('default', function () {
  (new Laravel(gulp))
    .startSection('compiling stylesheets')
    .task('autoprefixer')
    .task('cssmin')
    .run();
});
```

## License

The MIT License (MIT)

Copyright (c) 2015 Jeffrey Vandenborne

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

