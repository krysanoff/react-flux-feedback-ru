'use strict'

import gulp from 'gulp'

import webpack from 'webpack'
import WDS from 'webpack-dev-server'
import webpackConfig from '../webpack.config.babel.js'

export default gulp.task('wds', () => {
	let config = Object.create(webpackConfig)
	config.debug = true;

	new WDS(webpack(config), {
		hot: true,
		contentBase: './public'
	})
		.listen(3000, 'localhost')
})
