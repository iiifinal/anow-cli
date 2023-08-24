import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

import * as dotenv from 'dotenv';
const envConfig = dotenv.config({
    path: path.resolve(__dirname, "../.env" + process.env.BASE_ENV)
})
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
//样式配置规则
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const lessRegex = /\.less$/;
const stylRegex = /\.styl$/;
const tsxRegex = /\.(ts|tsx)$/;

const styleLoadersArray = [
    isDev?"style-loader":MiniCssExtractPlugin.loader,
    {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: "[path][name]__[local]--[hash:5]",
            },
        },
    },
    "postcss-loader"
]

const baseConfig: Configuration = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].[chunkhash:8].js',//指定指纹格式chunk
        clean: true,
        publicPath: '/',
        // 自定义输出文件名的方式是，将某些资源发送到指定目录
        assetModuleFilename:'images/[hash][ext][query]'
    },

    module: {
       
        rules: [
            {
                test: tsxRegex, // 匹配.ts, tsx文件
                exclude: /node_modules/,
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //       presets: [
                //         ['@babel/preset-env', { targets: "defaults" }]
                //       ],
                //       plugins: ['@babel/plugin-transform-runtime']
                //     }
                //   }
                // 项目变大之后再开启多进程loader。thread-loader放在所有loader之前
                use: ['thread-loader', 'babel-loader'] 
            },
            {
                test: cssRegex, //匹配 css 文件
                use: styleLoadersArray,
            },
            {
                test: lessRegex,
                use: [
                    ...styleLoadersArray,
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                importLoaders: 2,
                                // 可以加入modules: true，这样就不需要在less文件名加module了
                                modules: true,
                                // 如果要在less中写类型js的语法，需要加这一个配置
                                javascriptEnabled: true
                            },
                        },
                    },
                ],
            },
            {
                test: sassRegex,
                use: [
                    ...styleLoadersArray,
                    "sass-loader",
                ],
            },
            {
                test: stylRegex,
                use: [
                    ...styleLoadersArray,
                    "stylus-loader",
                ],
            },
            {
                test:/\.(png|jpe?g|gif|svg|webp)$/,
                type:"asset",//webpack5.0后继承image-loader，url-loader等
                parser: {
                    dataUrlCondition: {
                      maxSize: 10 * 1024 // 小于10kb转换成base64
                    }
                  },
                generator:{
                    filename:'static/images/[name].[contenthash:8][ext]'//文件输出的目录和命名
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)$/,
                type:"asset",//webpack5.0后继承image-loader，url-loader等
                parser: {
                    dataUrlCondition: {
                      maxSize: 10 * 1024 // 小于10kb转换成base64
                    }
                  },
                generator:{
                    filename:'static/fonts/[name].[contenthash:8][ext]'//文件输出的目录和命名
                }
            },
            {
                test:/\.(map4|webm|ogg|map3|wav|flac|aac)$/,
                type:"asset",//webpack5.0后继承image-loader，url-loader等
                parser: {
                    dataUrlCondition: {
                      maxSize: 10 * 1024 // 小于10kb转换成base64
                    }
                  },
                generator:{
                    filename:'static/media/[name].[contenthash:8][ext]'//文件输出的目录和命名
                }
            },
            {
                test:/\.json$/,
                type:"asset/resource",
                generator:{
                    filename:'static/json/[hash][ext][query]'//文件输出的目录和命名
                }
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css", ".scss", ".sass", ".styl", ".json"],
        // 别名需要配置两个地方，这里和 tsconfig.json
        alias: {
            "@": path.join(__dirname, "../src"),
        },
        // 查找第三方模块只在本项目的node_modules中查找
        modules: [path.join(__dirname, "../node_modules")]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack5-react-ts",
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            inject: true,
            hash: true,
            cache: true,
            minify: {
                collapseWhitespace: true,//去注释
                removeComments: true,//去空格
                minifyCSS: true,//压缩css
                minifyJS: true,//压缩js
                removeAttributeQuotes: true,//去掉属性引号
            },
            nodeModules: path.resolve(__dirname, '../node_modules'),

            chunks: ['main'],
            chunksSortMode: 'auto',
            showErrors: true,
        }),
        new DefinePlugin({
            "process.env": JSON.stringify(envConfig.parsed),
            "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new WebpackBar({
            color: "#85d",  // 默认green，进度条颜色支持HEX
            basic: false,   // 默认true，启用一个简单的日志报告器
            profile:false,  // 默认false，启用探查器。
          }),
    ].filter(Boolean),
        cache: {
        type: 'filesystem', // webpack5内置了cache-loader，直接开启文件缓存
      },
}

export default baseConfig

