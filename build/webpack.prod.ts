import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.base";
// import CssMinimizerPlugin from "css-minimizer-webpack-plugin";  
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const prodConfig: Configuration = merge(baseConfig, {
    mode: "production",
    // devtool: "source-map",
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         // new CssMinimizerPlugin(),
    //         new TerserPlugin({
    //             extractComments: false,
    //         }),
    //     ],
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    to: path.resolve(__dirname, "../dist"),
                    filter:(source)=>!source.includes("index.html"),
                },
            ],
        }),
    ],
    output: {
        filename: "js/[name].[contenthash].js",
    },
});

export default prodConfig;