// 开发环境配置
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')

const devServer = {
  port: 3000, // 指定监听请求的端口号
  host: 'localhost', // 指定使用的host
  // watchContentBase: true,
  // static: { // 指定静态文件
  //   directory: path.join(__dirname, '../publich'),
  //   publicPath: '/',
  // },
  compress: true, // 是否启用gzip
  historyApiFallback: true, // html5路由历史管理
  hot: true, // 热更新
  // devMiddleware: {},
  open: true, // 默认开启
}

const devConfig = {
  mode: 'development',
  devServer: devServer,
  watchOptions: {
    ignored: /node_modules/,
  }
}

module.exports = webpackMerge.merge(baseConfig, devConfig)
