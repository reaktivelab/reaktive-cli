/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    public: path.join(__dirname, './src/public'),
    assets: path.join(__dirname, './src/public/assets'),
    component: path.resolve(__dirname, './src/app/component'),
    route: path.resolve(__dirname, './src/app/route'),
    store: path.resolve(__dirname, './src/app/store'),
    type: path.resolve(__dirname, './src/app/type'),
    util: path.resolve(__dirname, './src/app/util'),
    query: path.resolve(__dirname, './src/app/query')
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: paths.dist,
        filename: '[name].js'
    },
    externals: {
        paths
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                },
                default: {
                    minChunks: 2,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        alias: {
            '@component': paths.component,
            '@route': paths.route,
            '@store': paths.store,
            '@util': paths.util,
            '@type': paths.type,
            '@query': paths.query
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            filename: './index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    publicPath: path.resolve(__dirname, '/assets/img'),
                    outputPath: 'assets/img',
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 1000
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    }
};