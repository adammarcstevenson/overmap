const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.resolve('./public'),
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve('./.env.development.local'),
      safe: true
    })
  ]
})