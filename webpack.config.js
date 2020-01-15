const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');


const appDir = fs.realpathSync(process.cwd());

const resolveAppPath = relativePath => path.resolve(appDir, relativePath);


const host = process.env.HOST || 'localhost';

module.exports = {

    mode: 'development',
    entry: resolveAppPath('src'),
    output: {
        filename: 'static/js/bundle.js',
    },
    devServer: {
        contentBase: resolveAppPath('public'),
        compress: true,
        hot: true,
        host,
        port: 3000,
        publicPath: '/',
    },
    plugins: [
        new htmlWebpackPlugin(
            {
                inject: true,
                template: resolveAppPath('public/index.html')
            }
        )
    ]
}

