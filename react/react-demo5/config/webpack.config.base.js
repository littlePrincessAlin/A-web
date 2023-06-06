// 基本配置
const path = require('path');
// 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
// console.log('path', path.resolve(__dirname, '../src')); // /Users/bailongma/react-demo/react/react-demo5/src
module.exports = {
  // 入口，entry 接受 string | [string, string] | Object
  entry: {
    app: './src/index.tsx',
  },
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    // 能够使用户在引入模块时不带扩展
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@context': path.resolve(__dirname, '../src/context'),
    }
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'YOLO',
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ // 将css单独打包
      filename: 'css/[name].[hash].css',
    })
  ],
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    name: 'development-cache',
  },
  
}
