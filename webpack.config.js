const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: process.env.NODE_ENV,
  mode: 'development',
  entry: {
    src: './client/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/react',
            // '@babel/preset-react',
            // '@babel/preset-env',
          ],
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    hot: true,
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build'),
    },
    proxy: {
      '/users': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      '/reviews': 'http://localhost:3000',
    },
  },
};
