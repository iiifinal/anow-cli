import path from "path";
import { merge } from "webpack-merge";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import WebpackDevServer, { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import baseConfig from "./webpack.base";

const openBrowser = require("./util/openBrowser");

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}
const host = "127.0.0.1";
const port = "8082";
const devConfig: Configuration = merge(baseConfig, {
    mode: "development",//开发者模式打包，省略代码优化步骤
    devtool: "eval-cheap-module-source-map",

});

const devServer = new WebpackDevServer({
    host,
    port,
    hot: true,//打开热更新
    open: true,//自动打开
    compress: false,//gzip压缩,开发环境不开启
    historyApiFallback: true,//路由history 404问题
    setupExitSignals: true,//允许sigin和sigterm信号时关闭开发服务器和退出进程
    //托管静态资源
    static: {
        directory: path.join(__dirname, "../public"),
        publicPath: "/",
        watch: {
            ignored: ["*.html"]
        }
    },
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
    }
}, webpack(devConfig));

devServer.start().then(() => {
    openBrowser(`http://${host}:${port}`)
})
export default devConfig
