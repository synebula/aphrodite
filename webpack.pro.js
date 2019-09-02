const merge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const base = require('./webpack.bas');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: "[name].[chunkhash:8].js",
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new ProgressBarPlugin({
            format: '> build [:bar] :percent (:elapsed seconds)',
            clear: false,
            width: 60
        })
    ],
    performance: {
        hints: false
    }
});