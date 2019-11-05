const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LauncherPlugin = require('./src/plugins/launcher-webpack-plugin');
const APP_PATH = path.resolve(__dirname, './src');
const BIN_PATH = path.resolve(__dirname, './bin');

module.exports = {
  entry: {
    main: APP_PATH + '/.launcher'
  },
  output: {
    path: BIN_PATH,
    publicPath: '/'
  },
  resolve: {
    alias: {
      "@": APP_PATH
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" //在html中插入<style>标签
          },
          {
            loader: "css-loader",//获取引用资源，如@import,url()
          },
          {
            loader: "postcss-loader", //自动加前缀
            options: {
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: [
                    "Android 4.1",
                    "iOS 7.1",
                    "Chrome > 31",
                    "ff > 31",
                    "ie >= 8"
                  ]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: {
              'hack': `true; @import "` + APP_PATH + `/public/color.less";`, // Override with less file
            },
            javascriptEnabled: true,
          },
        }]
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
        use: 'url-loader?limit=8129',
        //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new LauncherPlugin({ path: APP_PATH, hashHistory: false }),//应用的路径，是否使用hashHistory（默认BrowserHistory）
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      inject: 'body',
      minify: {
        html5: true
      },
      hash: false,
    })
  ],
};