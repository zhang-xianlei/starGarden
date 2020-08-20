# 问题汇总

## 1、 css loader

Q1、CSS 的热更新问题:

css 编译器 style-loader css 会被处理成 js 代码，开发模式中使用可以实现 css 的热更新。

mini-css-extract-plugin 通过配置可以将 css 文件从 js 中剥离出来，但是还没有实现热更新，所以适合生产模式使用。

## 2、静态资源库 （探究）

## 3、通过 js 引入的 img，生产模式打包好之后，路径存在问题
