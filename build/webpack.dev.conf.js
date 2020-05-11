/* eslint-disable */
// 开发配置主要设置跨域，开启源码调试，热更新
const webpack = require("webpack");

const path = require("path");
const PAGE_NAME = process.env.npm_config_pageName || "index";

module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        // publicPath: '' 此路径的打包文件可在浏览器中访问。 默认为 '/' 可以更改，但确保以斜杠 '/' 开头和结尾
        contentBase: path.join(__dirname, "../dist/"), // 告诉服务器从该目录中提供内容
        openPage: `${PAGE_NAME}.html`,
        disableHostCheck: true,
        host: "0.0.0.0",
        port: 80,
        hot: true,
        overlay: true, // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层0
        proxy: {
            // 用法详情举例  https://segmentfault.com/a/1190000016314976
            "/api": {
                target: "http://www.shuangbaotong.com:8080",
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: {
                    "^/api": "/"
                },
                headers: {
                    Cookie: ""
                }
            }
        },
        historyApiFallback: true // 任意的 404 响应都可能需要被替代
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
