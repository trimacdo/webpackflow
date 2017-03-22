const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
}

const commonConfig = {

  entry: {
    app: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },
plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Workflow',
    }),
  ],
};


const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. Good for complex setups.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080

    },
  };

  return Object.assign( {},
    commonConfig,
    config
  );
};


module.exports = (env) => {

  console.log('env', env);

  return commonConfig;


  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();

};
