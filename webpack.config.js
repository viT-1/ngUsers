const glob = require('glob');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// не забываем править эти свойства и в package.json scripts
const { publicPath, sourcePath } = require('./config');

const fileLoader = {
    loader: 'file-loader',
    options: {
        name: '[path][name].[ext]',
        context: sourcePath,
    },
};

// Скопипащено @link https://stackoverflow.com/questions/42670633/using-webpack-to-transpile-es6-as-separate-files
function getEntries(srcDir, pattern) {
    const entries = {};

    glob.sync(`${srcDir}/${pattern}`).forEach((file) => {
        entries[file.replace(`${srcDir}/`, '')] = path.join(__dirname, file);
    });

    return entries;
}

const webpackConfig = {
    // watch: true,
    target: 'web',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                fileLoader,
                'extract-loader',
                'css-loader',
            ],
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: [fileLoader],
        }, {
            test: /\.html$/,
            use: ['html-loader'],
        }],
    },
    entry: {
        // entry mask samples
        // ...getEntries(sourcePath, '**/*.js'),
        // ...getEntries(sourcePath, '**/*.css'),

        'index.js': path.resolve(sourcePath, 'index.js'),
        'index.css': path.resolve(sourcePath, 'index.css'),
    },
    output: {
        path: path.resolve(publicPath),
        filename: '[name]',
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            '@': path.resolve(__dirname, sourcePath),
        },
    },
    plugins: [
        new CleanWebpackPlugin(publicPath, {}),
        new HtmlWebpackPlugin({
            template: path.resolve(sourcePath, 'index.html'),
            filename: path.resolve(publicPath, 'index.htm'),
            hash: true,
            chunks: [
                'vendors.js',
                'index.js',
            ],
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['index.css'],
            hash: true,
            append: false,
        }),
        new OptimizeCssAssetsPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors.js',
                    chunks: 'all',
                },
            },
        },
    },
};

module.exports = [
    webpackConfig,
];
