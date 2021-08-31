const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');


module.exports = {
    stats: 'errors-only',
    watch: false,
    context: __dirname + '/../source',
    entry: {
        app: "./js/app",
        vendor: [
            "react", "react-dom", "mobx", "mobx-react-form", "mobx-react",
            "superagent/dist/superagent", "superagent-promise", "jquery", "core-js/library"
        ],
        clubCards: "./js/_react_app/pages/clubCards",
    },
    output: {
        publicPath: '/local/templates/pult/assets/',
        path: __dirname + '/../assets',
        filename: "js/[name].js"
    },
    resolve: {
        modules: [
            "node_modules",
        ]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-fontpath')({
                                        formats: [
                                            { type: 'embedded-opentype', ext: 'eot' },
                                            //{type: 'woff2', ext: 'woff2'},
                                            { type: 'woff', ext: 'woff' },
                                            { type: 'truetype', ext: 'ttf' },
                                            { type: 'svg', ext: 'svg' }
                                        ]
                                    }
                                ),
                                require('autoprefixer')({
                                    cascade: false
                                }),
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader:
                    'file-loader?name=fonts/[hash].[ext]'
            }
            ,
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders:
                    [ 'file-loader?hash=sha512&name=img/[hash].[ext]', {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                progressive: false,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                enabled: false,
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                enabled: false,
                                interlaced: false,
                            }
                        }
                    } ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new DuplicatePackageCheckerPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
};
