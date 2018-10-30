const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/react']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html'
        })
    ]
}
