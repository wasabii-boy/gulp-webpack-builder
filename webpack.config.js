
const 	config  			= require('./config'), 
		path 				= require('path'),
		webpack 			= require('webpack'),
		UglifyJsPlugin 		= require('uglifyjs-webpack-plugin'),
		{ VueLoaderPlugin } = require('vue-loader');



const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const webpack_config = {
	entry: {
		bundle : `./${config.path.src.js}/index.js`,
	},
	output: {
		path: path.join(__dirname, config.path.dist.main),
		filename: `./assets/js/bundle.js`,
	},
	mode: isDevelopment ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},{
				test: /.js?$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/
			},{
				test: /\.css$/,
				use: [
				  'vue-style-loader',
				  'css-loader',
				  'postcss-loader',
				]
			},{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				]
			},{
				test: /\.svg$/,
				use : {
					loader : 'svg-url-loader'
				}
			}
		]
	},
	devServer: {
		historyApiFallback: false,
		noInfo: false,
		contentBase: './dist',
		port: 8081,
		open: false,
		// proxy: {
		// 	'*': { 
		// 		target: 'host', 
		// 		secure: false,
		// 		changeOrigin: true,
		// 	}
		// },
	},
	watch: isDevelopment,
	
   	plugins: [
		// new webpack.ProvidePlugin({
        //     $				: "jquery",
        //     jQuery			: "jquery",
        //     "window.jQuery"	: "jquery"
		// }),
		new VueLoaderPlugin(),
	],
	resolve : {
		alias: {
			vue: 'vue/dist/vue.js',
			Utility	: path.resolve(__dirname, `${config.path.src.js}/utils/`),
		},
	}   

};



if (!isDevelopment) {
	webpack_config.plugins.push(new UglifyJsPlugin({
		sourceMap: false,
		uglifyOptions: {
			compress: true
		}
	}));
}
  
if (isDevelopment) webpack_config.devtool = 'source-map';
module.exports = webpack_config;
