const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    plugins: [
        new UglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: '../dist/css/app.css'
        }),
        new OptimizeCssAssetsPlugin()
    ],

    entry: './src/app.js',
    output: {
        filename: 'js/app.js',
        path: path.resolve(__dirname, '../dist/')
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                }),
            }
        ]
    }
}
