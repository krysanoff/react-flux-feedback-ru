'use strict'

import gulp from 'gulp'
import remember from 'gulp-remember'
import path from 'path'

import styles from './styles'
import resources from './resources'

export default gulp.task('watch', () => {

	// function forget(task, filepath) {
	// 	remember.forget(task, path.resolve(filepath))
	// }

	gulp.watch(['app/styles/**/*.styl', './app/blocks/**/*.styl'], gulp.parallel('styles'))
		.on('unlink', (filepath) => {
			remember.forget('styles', path.resolve(filepath))
		})
	gulp.watch(['./app/resources/**/*.*', '!./app/resources/styles/*.*'], gulp.parallel('resources'))
		.on('unlink', (filepath) => {
			remember.forget('resources', path.resolve(filepath))
		})

})
