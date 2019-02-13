const glob = require('glob');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// не забываем править эти свойства и в package.json scripts
const { publicPath, sourcePath } = require('./app.config');

// Скопипащено @link https://stackoverflow.com/questions/42670633/using-webpack-to-transpile-es6-as-separate-files
function getEntries(srcDir, pattern) {
    const entries = {};

    glob.sync(`${srcDir}/${pattern}`).forEach((file) => {
        entries[file.replace(`${srcDir}/`, '')] = path.join(__dirname, file);
    });

    return entries;
}

const webpackNodeJsConfig = {
    watch: true,
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        }],
    },
    entry: getEntries(sourcePath, '**/*.js'),
    output: {
        path: path.resolve(publicPath),
        filename: '[name]',
    },
    externals: [nodeExternals()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            '@': path.resolve(__dirname, sourcePath),
        },
    },
    plugins: [
        new CleanWebpackPlugin(publicPath, {}),
    ],
};

module.exports = [
    webpackNodeJsConfig,
];
