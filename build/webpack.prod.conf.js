/* eslint-disable */
// 主要配置拆分打包，压缩 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css单独打包成单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css

module.exports = {
    mode: 'production',
    optimization: { // 根据不同的 mode 来执行不同的优化
        splitChunks: {
            chunks: 'all',
            cacheGroups: { //打包成具体的js文件 以便在 HtmlWebpackPlugin 中的 chunks 属性中添加，注入到相应的页面中
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                element: {  // 单独将 elementUI 拆包
                    name: 'element',
                    priority: 15,
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css',
            chunkFilename: '[id].[hash:5].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g, // 用于匹配需要优化或者压缩的资源名 默认值是 /\.css$/g
            cssProcessor: require('cssnano'), // 用于压缩和优化css的处理器
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true // 插件能够打印
        })
    ]
}
