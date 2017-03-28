const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: 'js/[name].js',
    },
    /* htmlwebpackplugin is where single html file gets outputted, 
    need refactor to multipage output with chunks 
    vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    */
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack workflow',
        filename: 'templates/webpack.html',
        template: 'app/templates/webpack.html',
      }),
    ],
  },
  parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
 

  parts.extractCSS({ use: ['css-loader', parts.autoprefix(), 'sass-loader'] }),
  
  parts.purifyCSS({
    paths: glob.sync(path.join(__dirname, 'app/templates/*.html')),
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
   
  }),

  parts.loadCSS(),


]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
