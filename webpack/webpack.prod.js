const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'main-[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name]-[contenthash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve('./.env.production.local'),
      safe: true
    })
  ]
})
