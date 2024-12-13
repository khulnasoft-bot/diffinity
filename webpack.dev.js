const path = require('path')
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	module: {
		rules: [{
			test: /worker/,
			loader: 'worker-loader',
			options: { inline: 'no-fallback' }
		}, {
			include: [
				path.resolve(__dirname, 'src'),
				path.resolve(__dirname, 'examples')
			],
			test: /\.js$/
		}, {
			test: /\.css$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}]
		}]
	},

	resolve: {
		extensions: ['.js'],
		alias: {
			CodeMirror: path.join(__dirname, 'node_modules', 'codemirror')
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'examples', 'app.html'),
			filename: 'app.html',
			inject: true,
			chunks: [ 'app' ],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'examples', 'app-styles.html'),
			filename: 'app-styles.html',
			inject: true,
			chunks: [ 'styles' ],
		}),
		{
			apply: (compiler) => {
				compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
					console.log('-'.repeat(78));
					console.log('Applications:');
					console.log(chalk.bold(chalk.underline(chalk.cyan('http://localhost:8080/app.html'))));
					console.log(chalk.bold(chalk.underline(chalk.cyan('http://localhost:8080/app-styles.html'))));
					console.log('-'.repeat(78));
				});
			}
		}
	],

	entry: {
		app: [
			'./examples/app.js',
			'./src/diffinity'
		],
		styles: [
			'./examples/app-styles.js',
			'./src/diffinity'
		]
	},

	output: {
		filename: '[name].diffinity.js'
	},

	optimization: {
		chunkIds: 'named'
	}
}
