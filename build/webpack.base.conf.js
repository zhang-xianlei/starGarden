/* eslint-disable */
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const EslintFriendlyFormatter = require("eslint-friendly-formatter");
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const path = require("path");
const resolve = url => path.resolve(__dirname, "..", url);
const os = require('os');
const workers = os.cpus().length - 1;

const {
    pageEntries
} = require("../config/generateEntries");
// const vueLoader = require('../config/vueLoader.conf.js');
const productionConfig = require("./webpack.prod.conf");
const developmentConfig = require("./webpack.dev.conf");

const PAGE_NAME = process.env.npm_config_pageName || '';

const generateEntriesAndOut = (pageEntries, env) => {
    let entryObj = {};
    let HtmlWebpackPluginArr = [];
    if (Array.isArray(pageEntries) && pageEntries.length) {
        pageEntries.forEach(item => {
            const jsEntries = env === 'development' ? [resolve(item.jssrc), resolve('src/scripts/injectVConsole.js')] : [resolve(item.jssrc)]
            entryObj[item.jsout] = jsEntries
            HtmlWebpackPluginArr.push(
                new HtmlWebpackPlugin({
                    title: item.jsout,
                    filename: item.htmlout,
                    favicon: resolve('src/assets/favicon/favicon.ico'),
                    template: resolve(item.htmlsrc),
                    chunks: [item.jsout, "vendor", "element", "vue", 'vue-router'], // 设置注入 html 具体的js文件
                    minify: {
                        collapseWhitespace: true
                    }
                })
            );
        });
    }
    return {
        entryObj,
        HtmlWebpackPluginArr
    };
};
/**
 * 根据不同的环境生成不同的配置
 * @param {*} env
 */
const generateConfig = env => {
    const entryAndOutInfo = generateEntriesAndOut(pageEntries(PAGE_NAME), env);
    console.log(`**************${env}*************`);
    // 将需要的 Loader 和 Plugin 单独声明
    let scriptLoader = [{
        loader: "thread-loader",
        options: {
            workers,
            name: 'thread-expensive'
        }
    }, "cache-loader", "babel-loader"];

    // 开发环境：页内样式嵌入
    let cssLoader = [
        "vue-style-loader",
        "css-loader",
        "postcss-loader", // 使用 postcss 为 css 加上浏览器前缀
        "sass-loader" // 使用 sass-loader 将 scss 转为 css
    ];

    let cssExtractLoader = [{
            loader: MiniCssExtractPlugin.loader
        },
        // 'style-loader',
        // 'vue-style-loader', use these two loaders leading to module build failed, detais in https://github.com/webpack-contrib/mini-css-extract-plugin/issues/173
        "css-loader",
        "postcss-loader",
        "sass-loader"
    ];

    let fontLoader = [{
        loader: "file-loader",
        options: {
            name: "[name]-[hash:5].min.[ext]",
            limit: 5000,
            publicPath: "fonts/",
            outputPath: "fonts/"
        }
    }];

    let imageLoader = [{
            loader: "file-loader",
            options: {
                name: "[name]-[hash:5].min.[ext]",
                limit: 10000,
                outputPath: "images/"
            }
        },
        {
            // mac 环境实用会报错，因为缺少个依赖包 mozjpeg，并且国内环境安装不了。所以 mac 环境不能使用图片压缩 https://myclusterbox.com/view/1566
            loader: "image-webpack-loader",
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 50 // 压缩率
                },
                // 压缩 png 图片
                pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4
                }
            }
        }
    ];

    let styleLoader = env === "development" ? cssLoader : cssExtractLoader;

    let options = {
        entry: entryAndOutInfo.entryObj,
        output: {
            publicPath: env === "development" ? "/" : "./",
            path: resolve("dist"),
            filename: "[name]-[hash:5].bundle.js",
            chunkFilename: "[name]-[hash:5].chunk.js"
        },
        resolve: {
            alias: {
                "@assets": resolve("src/assets"),
                "@styles": resolve("src/styles"),
                "@scripts": resolve("src/scripts"),
                "@comps": resolve("src/components"),
                "@api": resolve("src/api"),
                vue$: "vue/dist/vue.js"
            },
            extensions: ["*", ".js", ".json", ".vue"]
        },
        module: {
            rules: [{
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    enforce: "pre",
                    include: [resolve("src")],
                    options: {
                        fix: true,
                        outputReport: {
                            formatter: EslintFriendlyFormatter
                        }
                    }
                    // include: [resolve('src'), resolve('test')],
                },
                {
                    test: /\.vue$/,
                    use: [{
                        loader: "thread-loader",
                        options: {
                            workers,
                            name: 'thread-expensive'
                        }
                    }, "cache-loader", {
                        loader: "vue-loader",
                        /* options: {
                            loaders: vueLoader.cssLoaders({
                                // CSS Sourcemaps off by default because relative paths are "buggy"
                                // with this option, according to the CSS-Loader README
                                // (https://github.com/webpack/css-loader#sourcemaps)
                                // In our experience, they generally work as expected,
                                // just be aware of this issue when enabling this option.
                                sourceMap: !env === "development",
                                extract: env === "development",
                                debug: !env === "development"
                            })
                        } */
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: scriptLoader
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: styleLoader
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fontLoader
                },
                {
                    test: /\.(jpeg|png|jpg|gif)$/,
                    use: imageLoader
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new VueLoaderPlugin(),
            new webpack.ProvidePlugin({
                $: "jquery"
            }),
            ...entryAndOutInfo.HtmlWebpackPluginArr
        ]
    };
    if (env === "ana")
        options.plugins.unshift(
            new BundleAnalyzer({
                analyzerPort: 8081
            })
        );
    return options;
};

module.exports = () => {
    let env = process.env.NODE_ENV;
    let config = env === "development" ? developmentConfig : productionConfig;
    return env === "ana" ? smp.wrap(merge(generateConfig(env), config)) : merge(generateConfig(env), config);
};
