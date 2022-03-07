/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const PORT = 4000;

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        port: PORT,
        watchFiles: {
            paths: ['src/**/*']
        },
        open: true
    }
});
