'use strict'

import gulp from 'gulp'
import sourcemap from 'gulp-sourcemaps'
import gulpIf from 'gulp-if'

import webpack from 'webpack'
import webpackConfig from '../webpack.config.babel.js'
import stream from 'webpack-stream'

export default gulp.task('webpack', () => {
	return gulp.src('app/**/*.*')
		.pipe(gulpIf(isDevelopment, sourcemap.init()))
		.pipe(stream(webpackConfig))
		.pipe(gulpIf(isDevelopment, sourcemap.write('.')))
		.pipe(gulp.dest('./public/'))
})
