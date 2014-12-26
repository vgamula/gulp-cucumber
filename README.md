gulp-cucumber
==
Gulp task for running [cucumber.js](https://github.com/cucumber/cucumber-js) features

Installation
==
```sh
npm install gulp-cucumber
```

Using:
==
```js
var cucumber = require('gulp-cucumber');

gulp.task('cucumber', function() {
    return gulp.src('features/*').pipe(cucumber({
        'steps': 'features/steps/steps.js',
        'format': 'summary'
    }));
});
```

**Be aware that `options.steps` and `options.support` both accept a glob pattern**
**or array of glob patterns (grunt-style matching) if necessary.**
```js
gulp.task('cucumber', function() {
    return gulp.src('*features/*').pipe(cucumber({
        'steps': '*features/steps/*.js',
        'support': '*features/support/*.js'
    }));
});
```

`options.format` supports cucumber standard output formats : `summary`, `pretty` (default), `json`, `progress`

License
==
The MIT License (MIT)

Copyright (c) 2014 Volodymyr Gamula v.gamula@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
