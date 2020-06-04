const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LauncherPlugin = require('../src/plugins/launcher-webpack-plugin');
const APP_PATH = path.resolve(__dirname, '../src');
const BIN_PATH = path.resolve(__dirname, '../bin');

module.exports = {
  entry: {
    main: APP_PATH + '/.launcher',
  },
  output: {
    path: BIN_PATH,
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': APP_PATH,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            '@babel/transform-runtime',
            '@babel/proposal-export-default-from',
            [
              '@babel/proposal-decorators',
              {
                legacy: true,
              },
            ],
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true,
              },
            ],
            [
              'import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
              },
            ], // `style: true` 会加载 less 文件
          ],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //匹配所有已.css结尾的文件
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        use: 'url-loader?limit=8129',
        //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new LauncherPlugin({ path: APP_PATH, hashHistory: false }), //应用的路径，是否使用hashHistory（默认BrowserHistory）
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      inject: 'body',
      minify: {
        html5: true,
      },
      hash: false,
    }),
  ],
};
