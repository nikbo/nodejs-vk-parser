let gulp = require('gulp');

export default function copyAppBundle() {
    return gulp.src(['scripts/vendor-bundle*.js', 'scripts/app-bundle*.js', 'scripts/app-bundle*.js.map'])
        .pipe(gulp.dest('dist/scripts'));
}
