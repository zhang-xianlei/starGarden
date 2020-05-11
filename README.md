# 说明

## 安装 cnpm

    npm install -g cnpm --registry=https://registry.npm.taobao.org

## node-sass phantomjs 安装之前需要在 .npmrc 文件中添加下面两行配置

    sass_binary_site = https://npm.taobao.org/mirrors/node-sass
    phantomjs_cdnurl = https://npm.taobao.org/mirrors/phantomjs

## 安装依赖包

    cnpm i

## 启本地服务 [单独页面]

    npm run dev [--pageName=pagename]

## 打包 [单独页面]

    npm run build [--pageName=pagename]

## node npm 版本

    node '^10'  npm '^6'

## 访问页面

    src/pages/pageName 对应的 url 为 host:port/pageName.html
