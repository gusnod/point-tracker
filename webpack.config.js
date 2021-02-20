const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: "production",
    entry: './src/index.tsx',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node-modules/'
            },
              {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
              }
        ],
    },
      plugins: [
        new HtmlWebpackPlugin({
          inject: 'body',
          template: './src/index.html',
          filename: 'index.html'
        })
      ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: 'index.html'
        }
    }
}