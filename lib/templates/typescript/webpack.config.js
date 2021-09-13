/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PORT = 4000;
const paths = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    public: path.join(__dirname, './src/public'),
    assets: path.join(__dirname, './src/public/assets'),
    component: path.resolve(__dirname, './src/app/component'),
    store: path.resolve(__dirname, './src/app/store'),
    type: path.resolve(__dirname, './src/app/type'),
    util: path.resolve(__dirname, './src/app/util'),
    query: path.resolve(__dirname, './src/app/query')
};

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: paths.dist,
        filename: '[name].[contenthash].js'
    },
    mode: 'development',
    externals: {
        paths
    },
    devtool: 'source-map',
    devServer: {
        port: PORT,
        compress: true,
        watchFiles: {
            paths: ['src/**/*']
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            '@component': paths.component,
            '@store': paths.store,
            '@util': paths.util,
            '@type': paths.type,
            '@query': paths.query
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
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
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 1000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            filename: './index.html'
        })
    ]
};
