
const isDEV=process.env.NODE_ENV==='development';
module.exports={
    // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { "browsers": ["last 2 versions", "ie >= 11", "not ie <= 8"] },
                useBuiltIns: 'usage',// 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                corejs: { version: 3 },
                loose: true,
            }
        ],
        [
            '@babel/preset-react', // 如果您使用的是 Babel 和 React 17，您可能需要将 "runtime": "automatic" 添加到配置中。
            { runtime: 'automatic' }// 否则可能会出现错误：Uncaught ReferenceError: React is not defined
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        //配置装饰器插件
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        isDEV&&require.resolve('react-refresh/babel'),//启动热更新
    ]
}