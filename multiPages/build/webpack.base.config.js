const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyrightPlugin = require('./plugins/copyrightWebpackPlugin');
const {resolve} = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('../config')[NODE_ENV];
    const files = require('../config/pages');

    let entry = {
        common: ['./app/index.js']
    };

    let plugins = [
        new ExtractTextPlugin({
            filename: `${config.filePath}css/${config.filenameHash ? '[name].[contenthash:8]' : '[name]'}.css`,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedChunksPlugin(),
        new CopyrightPlugin(`/**\n * 作者: 王佳欣\n * 站点: http://www.shuxia123.com\n */`),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.STATIC_PATH': JSON.stringify(config.staticPath),
            'process.env.HOST': JSON.stringify(config.HOST)
        })
    ];

    files.forEach((item) => {
        entry[item.name] = item.path;
        plugins.push(
            new HtmlWebpackPlugin({
                filename: item.filename,
                template: item.template,
                chunks: ['runtime', 'common', item.name],
                hash: false,
                inject: 'body',
                xhtml: false,
                minify: {
                    removeComments: true,
                }
            })
        );
    });

    const webpackConfig = {
        entry,
        output: {
            path: resolve('./dist'),
            publicPath: config.staticPath,
            filename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`,
            chunkFilename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`
        },
        externals: {
        },
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader'
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: `url-loader?limit=1&name=${config.imgPath}images/${config.filenameHash ? '[name].[hash:8]' : '[name]'}.[ext]`
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: `file-loader?name=${config.filePath}fonts/${config.filenameHash ? '[name].[hash:8]' : '[name]'}.[ext]`
                },
                {
                    test: /\.(scss|css)$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: false,
                                    minimize: true,
                                }
                            },
                            'postcss-loader',
                            'sass-loader?sourceMap',
                        ],
                        fallback: 'style-loader'
                    })
                },
            ]
        },
        plugins,
        resolve: {
            alias: {
                app: resolve('app/'),
                appModules: resolve('app/modules'),
                utils: resolve('utils'),
                scss: resolve('scss/'),
                layout: resolve('layout/index.js')
            }
        },
    };

    // 开发环境服务器配置
    if (NODE_ENV === 'development') {
        webpackConfig.devServer = {
            contentBase: resolve('dist'),
            compress: false,
            host: '127.0.0.1',
            port: config.port,
            hot: true,
            disableHostCheck: true,
            historyApiFallback: true
        };

        // webpack watch 配置
        webpackConfig.watchOptions = {
            poll: 500,
            aggregeateTimeout: 500,
            ignored: 'node_modules'
        };
    } else {
        webpackConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    dead_code: true
                },
                sourceMap: true,
                output: {
                    comments: false
                }
            })
        );
    }

    return webpackConfig;
};
