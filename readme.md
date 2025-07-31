## drpy_webpack

drpy2框架的打包项目。所有依赖打包成一个`drpy-core.min.js` `drpy-core-lite.min.js`

[drpyS项目传送门](https://github.com/hjdhnx/drpy-node)

当前版本号: `3.9.52beta3 20250801`

注意复制到drpyS项目 `public/drpy` 目录前需要把 init_test里的一些调试日志注释掉

### 构建过程参考命令

```bash
# 创建项目目录并进入
#mkdir webpack-project && cd webpack-project

# 初始化 package.json (一路回车或按需填写)
yarn init -y

# 安装核心依赖
yarn add webpack webpack-cli --dev
yarn add terser-webpack-plugin --dev  # 压缩插件

yarn add webpack webpack-cli babel-loader @babel/core @babel/preset-env --dev
yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-optional-chaining --dev
yarn add script-loader --dev

```

执行编译的时候需要去掉package.json里的  `"type": "module",`，执行drpy-test.js测试的时候需要加回去