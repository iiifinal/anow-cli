import path from 'path';
import { Configuration,DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as dotenv from 'dotenv';

const envConfig=dotenv.config({
    path:path.resolve(__dirname,"../.env"+ process.env.BASE_ENV)
})


// const devConfig: Configuration = {
//     mode: 'development',
//     devtool: 'eval-cheap-module-source-map',
// };

const baseConfig: Configuration = {
    entry: path.join(__dirname, '../src/index.tsx'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].js',
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: "babel-loader",
                // exclude: /node_modules/
            },     
            {
                test: /.*\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
        // 别名需要配置两个地方，这里和 tsconfig.json
        alias: {
          "@": path.join(__dirname, "../src"),
        },
        // 查找第三方模块只在本项目的node_modules中查找
        modules:[path.join(__dirname, "../node_modules")]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"webpack5-react-ts",
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            inject:true,
            hash:true,
            cache:true,
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
        new CleanWebpackPlugin(),
    ].filter(Boolean)
}

export default baseConfig

