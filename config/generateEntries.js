const fs = require("fs");
const path = require("path");
const join = path.join;

module.exports = {
    pageEntries: function (params = '') {
        // 页面入口
        const pageBase = "src/pages";
        const pageArr = fs.readdirSync(pageBase);

        // 过滤以 . 开头的隐藏文件夹
        const isNotHiddenFile = file => file.indexOf(".") !== 0;

        // 过滤非文件夹
        const isDir = page => fs.statSync(join(pageBase, page)).isDirectory();

        // 过滤非 html 文件
        const htmlRe = /.html$/;
        const isHtmlFile = htmlRe.test.bind(htmlRe);

        // 拍平嵌套数组
        const flatten = arr =>
            Array.isArray(arr) ?
                arr.reduce((acc, cur) => acc.concat(flatten(cur)), []) :
                arr;

        // 识别正则字符串的正则
        const reForReStr = /^\/(.*)\/$/;

        // 页面路径的正则
        const pagePathRe = reForReStr.test(params) ? // 部分匹配
            RegExp(reForReStr.exec(params)[1], "i") :
            params ? // 完全匹配
                RegExp(`^${params}$`, "i") : // 全部匹配
                RegExp("", "i");

        // 递归寻找 html 文件
        const recursiveFindHtml = pagePathArr => {
            const fileArr = fs.readdirSync(join(pageBase, ...pagePathArr));
            const isNotPrefixDir = fileArr.some(isHtmlFile);

            // 找到了 html 文件，结束递归
            if (isNotPrefixDir) {
                const htmlArr = fileArr
                    .filter(isHtmlFile)
                    // 过滤出目标 html
                    .filter(() => pagePathRe.test(pagePathArr.join("-")));

                return {
                    pagePathArr,
                    htmlArr
                };
            }

            return fileArr
                .filter(isNotHiddenFile)
                .filter(file => isDir(join(...pagePathArr, file)))
                .map(file => recursiveFindHtml([...pagePathArr, file]));
        };

        const entries = pageArr
            .filter(isNotHiddenFile)
            .filter(isDir)
            .map(page => recursiveFindHtml([page]))
            .reduce((acc, cur) => acc.concat(flatten(cur)), [])
            .reduce(
                (acc, {
                    pagePathArr,
                    htmlArr
                }) =>
                    htmlArr
                        .map(html => ({
                            pagePathArr,
                            html
                        }))
                        .concat(acc),
                []
            )
            .map(({
                pagePathArr,
                html
            }) => {
                // 使用 - 连接前缀生成页面名称
                const pageStr = pagePathArr.join("-");
                // 必须让 html 和入口 js 同名？
                const shortHtml = html.replace(path.extname(html), "");
                return {
                    htmlsrc: join(pageBase, ...pagePathArr, html),
                    htmlout: `${pageStr}.html`,
                    jssrc: `${join(pageBase, ...pagePathArr, shortHtml)}.js`,
                    jsout: pageStr
                };
            });
        return entries;
    }
};
