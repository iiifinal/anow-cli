import { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackBar from 'webpackbar'
import * as dotenv from 'dotenv'
import { isDev } from './constants'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const envConfig = dotenv.config({
  path: path.resolve(__dirname, `../.env/.env.${process.env.BASE_ENV}`)
})

// console.log('NODE_ENV', process.env.NODE_ENV)
// console.log('BASE_ENV', process.env.BASE_ENV)

const styleLoadersArray = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[path][name]__[local]--[hash:5]'
      }
    }
  },
  'postcss-loader'
]

const baseConfig: Configuration = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name].[chunkhash:8].js', // 指定指纹格式chunk
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/',
    // 自定义输出文件名的方式是，将某些资源发送到指定目录
    assetModuleFilename: 'images/[name].[contenthash:8][ext]'
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // 匹配.ts, tsx文件
        exclude: /node_modules/,
        use: 'babel-loader'
        // 项目变大之后再开启多进程loader。thread-loader放在所有loader之前
        // use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.css$/, // 匹配 css 文件
        use: styleLoadersArray
      },
      {
        test: /\.less$/,
        use: [
          ...styleLoadersArray,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                importLoaders: 2,
                // 可以加入modules: true，这样就不需要在less文件名加module了
                modules: true,
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          ...styleLoadersArray,
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass') // 使用dart-sass代替node-sass
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [...styleLoadersArray, 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset', // webpack5.0后继承image-loader，url-loader等
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转换成base64
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]' // 文件输出的目录和命名
        }
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/json/[name].[contenthash:8][ext]' // 文件输出的目录和命名
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset', // webpack5.0后继承image-loader，url-loader等
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转换成base64
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 文件输出的目录和命名
        }
      },
      {
        test: /\.(map4|webm|ogg|map3|wav|flac|aac)$/,
        type: 'asset', // webpack5.0后继承image-loader，url-loader等
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转换成base64
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 文件输出的目录和命名
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css', '.scss', '.sass', '.styl', '.json'],
    // 别名需要配置两个地方，这里和 tsconfig.json
    alias: {
      '@': path.join(__dirname, '../src')
    }
    // 查找第三方模块只在本项目的node_modules中查找
    // modules: [path.join(__dirname, '../node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'next-anow',
      filename: 'index.html',
      template: path.join(__dirname, '../public/index.html'),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: true, // 如果本地打包有缓存chunk文件，但后续有改变打包输出的路径，先把缓存关闭，再打包
      minify: {
        collapseWhitespace: true, // 去注释
        removeComments: true, // 去空格
        minifyCSS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyJS: true, // 压缩js
        removeAttributeQuotes: true // 去掉属性引号
      },
      nodeModules: path.resolve(__dirname, '../node_modules')
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(envConfig.parsed),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackBar({
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false // 默认false，启用探查器。
    })
  ].filter(Boolean),
  cache: {
    type: 'filesystem' // webpack5内置了cache-loader，直接开启文件缓存
  }
}

export default baseConfig
