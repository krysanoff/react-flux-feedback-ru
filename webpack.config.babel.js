'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development'
console.log("NODE_ENV = " + NODE_ENV)
console.log(__dirname)

import webpack from 'webpack'

import ExtractTextPlugin from "extract-text-webpack-plugin"

export default {
	context: __dirname + '/app',

	entry: {
		index: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', './index'],
		style: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', './resources/styles/style']
	},
	output: {
		filename: "[name].js",
		path: __dirname + '/public'
	},

	// devtool: NODE_ENV == 'development' ? 'cheap-module-source-map' : null,

	watch: true,

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			LANG: JSON.stringify('ru')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),

		new ExtractTextPlugin("resources/styles/style.css", {allChunks: true, disable: NODE_ENV=='development'}),

		new webpack.HotModuleReplacementPlugin()
	],

	resolve: {
		moduleDirectories: ['node_modules'],
		extensions: ['', '.js', '.css']
	},

	resolveLoader: {
		moduleDirectories: ['webpack_modules', 'node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	module: {
		// preLoaders:	[
		// 	{
		// 		test: /\.js$/,
		// 		loaders: ['eslint'],
		// 		include: [__dirname + '/frontend'],
		// 	}
		// ],

		loaders: [
			{

				test: /\.jsx?$/,
				include: __dirname + '/app',
				loaders: ['react-hot', 'babel']

			},{

				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

			}
		]
	},
}

// if (NODE_ENV == 'production') {
// 	module.exports.plugins.push(
// 		new webpack.optimize.UglifyJsPlugin({
// 			compress: {
// 				warnings: false,
// 				drop_console: true,
// 				unsafe: true
// 			}
// 		})
// 	)
// }
