const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
    contentBase: false,
    hot: true,
    https: false,
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});


exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const extractplugin = new ExtractTextPlugin({
    filename: 'css/[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          include,
          exclude,

          use: extractplugin.extract({
            use,
          }),
        },
      ],
    },
    plugins: [extractplugin],
  };
};
