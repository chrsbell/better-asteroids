const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../../public'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      path.resolve(__dirname, 'src/Game'),
      path.resolve(__dirname, 'src/Game/Objects'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      author: 'Chris Bell',
      description: 'Asteroids Game',
      title: 'Better Asteroids',
      template: 'src/index.html',
      filename: 'index.html',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
