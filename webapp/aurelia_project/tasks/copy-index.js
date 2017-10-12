let gulp = require('gulp');
let replace = require('gulp-replace');

export default function copyIndex() {
    return gulp.src(['index.html'])
        .pipe(replace(/#000/g, `?rev=${Date.now()}`))
        .pipe(gulp.dest('dist'));
}
