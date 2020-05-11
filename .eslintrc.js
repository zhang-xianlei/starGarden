// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            legacyDecorators: true
        },
    },
    env: {
        node: true,
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
        'standard',
        'plugin:vue/essential',
    ],
    // required to lint *.vue files
    plugins: [ 'vue' ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 4个空格缩进
        'indent': ['error', 4],
        // 结尾分号 不作限制！
        'semi': ['error', 'never'],
        // 仅在多行时，结尾添加逗号
        'comma-dangle': ['error', 'only-multiline'],
        // ！由于当前无法确定某些数据是什么类型，暂时禁用 ===，待之后整理后再开启
        'eqeqeq': 0,
        // 关闭驼峰检测 因为有一些api返回的数据变量
        'camelcase': 0,
        // 关闭 Promise 构造函数中必须以 resolve, reject 命名的限制
        'promise/param-names': 0,
    }
}
