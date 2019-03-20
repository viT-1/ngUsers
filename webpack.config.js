const glob = require('glob');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// не забываем править свойства publicPath и sourcePath в том числе в package.json scripts
const {
    publicPath,
    sourcePath,
    theme,
    cssFilter,
} = require('./config');

const fileLoader = {
    loader: 'file-loader',
    // @link: https://github.com/webpack-contrib/file-loader/issues/46#issuecomment-196549110
    // https://github.com/webpack-contrib/file-loader/issues/32#issuecomment-250622904
    options: {
        // Каждый css-модуль подключается отдельно
        publicPath: '../',
        name: '[folder]/[name].[ext]',

        // вариант для общего (со всеми импортированными файлами) index.css в корне,
        // а картинки остаются в своих директориях - по модулям
        // name: '[path][name].[ext]',
        // context: sourcePath,
    },
};

// Скопипащено @link https://stackoverflow.com/questions/42670633/using-webpack-to-transpile-es6-as-separate-files
function getEntries(srcDir, pattern, retOnlyFolders) {
    const entries = {};

    glob.sync(`${srcDir}/${pattern}`).forEach((file) => {
        if (!retOnlyFolders.includes(file.split('/')[1])) return;

        entries[file.replace(`${srcDir}/`, '')] = path.join(__dirname, file);
    });

    return entries;
}

const filteredCssEntries = getEntries(sourcePath, `**/*.${theme}.css`, cssFilter);

const allEntries = {
    // entry mask samples
    // ...getEntries(sourcePath, '**/*.js'),
    ...filteredCssEntries,
    'index.js': ['@babel/polyfill', path.resolve(sourcePath, 'index.js')],
};

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
            test: /\.(css|styl)$/,
            exclude: /node_modules/,
            use: [
                fileLoader,
                'extract-loader',
                'css-loader',
                // @link: https://github.com/stylus/stylus/issues/2282
                'stylus-loader',
            ],
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: [fileLoader],
        }, {
            test: /\.html$/,
            use: ['html-loader'],
        }],
    },
    entry: allEntries,
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
            // Прямой/дубовый вариант подключения css
            // assets: ['index.css'],
            // Вариант, когда подключаются все найденные по маске css-файлы
            // assets: Object.keys(cssEntries),
            // Вариант, когда подключаются только те файлы, которые в зависимостях app
            assets: Object.keys(filteredCssEntries),

            hash: true,
            append: false,
        }),
        new OptimizeCssAssetsPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            // Иначе модули, чьё имя берётся из es6 class как this.name конфликтуют
            // @link: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/269
            terserOptions: { mangle: false, keep_classnames: true },
        })],
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
