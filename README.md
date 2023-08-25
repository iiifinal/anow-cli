
# anow-cli

#### 简介

ts+react的基础配置项目，已完成的配置有：开发代码浏览器更新优化，vscode配置，webpack优化（装饰器，体积切割，压缩，chunk优化，tree-shaking等），代码格式化与检查，commit提交规范化，版本自动生成与控制

#### 安装教程

1.安装相关的依赖
 npm i 或者 pnpm i

2.执行commitlint全局安装
npm i commitizen -g 或者 pnpm i commitizen -g 或者npm run init-global

#### 提交示例

1. git add .
<!-- 添加修改文件到git暂存去区 -->

1. git cz
<!-- 此步骤等同commit，但有相应的规范引导以及格式说明，具体参考配置文件commitlint.config.js说明以及commitizen插件官方说明-->

##### 版本控制说明
<!-- 具体用法请看standard-version -->
1. pnpm run release  <!-- 生成版本日志 -->
<!-- alpha: 内部版本
     beta: 公测版本
     rc: 候选版本(Release candiate -->
