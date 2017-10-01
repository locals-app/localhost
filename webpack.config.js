const path = require('path');

const webpackConfig = {
  entry: path.resolve(__dirname, './client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './client/static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
      historyApiFallback: true
  },
  devtool: 'inline-source-map',
};

webpackConfig.module.loaders.push({
  test: /\.js[x]?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: { 
    presets: ['es2015', 'react'],  
    plugins: ['transform-class-properties'] 
  },
});

webpackConfig.module.loaders.push({
  test: /\.(scss|css)$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader'],
});

webpackConfig.module.loaders.push({
  test: /\.(jpg|png|svg)$/,
  loader: 'url-loader',
  options: {
    limit: 25000,
  }
});

module.exports = webpackConfig;