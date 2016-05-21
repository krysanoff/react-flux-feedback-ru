'use strict'

import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'
import remember from 'gulp-remember'

export default gulp.task('resources', () => {
	return gulp.src(['./app/resources/**/*.*', './app/resources/styles/*.*'])
		.pipe(newer('./public/assets'))
		.pipe(remember('resources'))
		.pipe(gulp.dest('./public/assets'))
})
