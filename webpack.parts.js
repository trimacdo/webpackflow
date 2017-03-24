const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');


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

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
  },
});


exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});
