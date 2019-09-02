
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.bas');

module.exports = merge(base, {
    mode: 'development',
    output: {
        filename: "[name].[hash:8].js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8000,
        compress: true,
        historyApiFallback: {
            index: '/index.html'
        },
        hot: true,
        https: false,
        noInfo: true,
        open: true,
        proxy: {}
    }
});