import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.base";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";  
// import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CompressionPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const globAll=require('glob-all')
const glob = require("glob");
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const prodConfig: Configuration = merge(baseConfig, {
    mode: "production",
    // devtool: "source-map",
    optimization: {
        minimize: true,//开启terser
        //减少入口文件打包的体积，运行代码是会独立筹集成一个runtime文件
        runtimeChunk:{
            name:'mainfels'
        },
        minimizer: [
            //压缩css
            new CssMinimizerPlugin(),
            //js的压缩与混淆
            new TerserPlugin({
                parallel:true,//开启多线程压缩
                extractComments:false,//将注释剥离到单独文件，默认是true
                terserOptions:{
                    compress:{
                        ecma:5,
                        keep_fargs:false,
                        hoist_funs:true,
                        pure_getters:true,
                        pure_funcs:[
                            'console.log',
                            'classCallCheck',
                            '_classCallCheck',
                            '_possibleConstrutorReturn',
                            'Object.freeze',
                            'invariant',
                            'warning'
                        ]//删除console.log
                    }
                }
            }),
            
        ],
        //进行代码切割
        splitChunks:{
            //include all types of chunks 支持一步和非一步共享chunk
            chunks:'all',
            minSize:20000,
            minRemainingSize:0,
            minChunks:1,
            maxAsyncRequests:30,
            maxInitialRequests:30,
            enforceSizeThreshold:50000,
            cacheGroups:{
                vendors:{
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 10, // 提取优先级为1
                    enforce:true,
                    reuseExistingChunk:true,
                },
                commons: { // 提取页面公共代码
                    name: 'commons', // 提取文件命名为commons
                    minChunks: 2, // 只要使用两次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority:0,//优先级
                    enforce:true,
                    reuseExistingChunk:true,
                },
                styles:{
                    name:'styles',
                    test:/\.css$/,
                    chunks:'all',
                    enforce:true,
                }
            }
        }
        
    },
    plugins: [
        //复制静态资源
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    filter:(source)=>!source.includes("index.html"),
                },
            ],
        }),
           //抽离css插件
           new MiniCssExtractPlugin({
            filename:'static/css/[name].[contenthash:8].css',
            chunkFilename:'static/css/[name].[contenthash:8].css'
           }),
   
             //清理无用的css，tree-shaking思想
             new PurgeCSSPlugin({
                // paths:globAll.sync([
                //     `${path.join(__dirname,'..src')}/**/*`,
                //      path.join(__dirname,'../public/index.html')
                // ],{nodir:true}
                // ),
                paths:glob.sync(`${path.join(__dirname,'..src')}/**/*`,{nodir:true}),
                only:["dist"],
                safelist:{
                    standard:[/^ant-/]//过滤掉ant-开头的类名，没用到也不删除
                }
                
            }),
     
        //打包时生成gzip文件
        new CompressionPlugin({
            test: /\.(js|css)$/, // 生成css,js压缩文件
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', //默认是gzip
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8 // 压缩率,默认值是 0.8
        }),
        // new CleanWebpackPlugin(),
    ],
    output: {
        filename: "js/[name].[contenthash].js",
    },
    performance: {
        hints: false,
        maxAssetSize: 4000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 5000000 // 整数类型（以字节为单位）
      }
});

export default prodConfig;