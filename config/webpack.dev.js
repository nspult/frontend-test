const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = function () {
    return Merge(CommonConfig, {
        mode: 'development',
        watch: false
    });
};