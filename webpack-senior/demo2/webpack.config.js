const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //   entry: "./src/main.js", // 只有一个入口文件，单入口
  entry: {
    // 多个入口文件，多入口
    app: "./src/app.js",
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // webpack命名方式，[name]为入口文件名
    clean: true, // 在生成文件之前清空 output 目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"), // 指定模板文件
    }),
  ],
  mode: "production",
  optimization: {
    // 代码分隔配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分隔
      // 以下是默认值
      // minSize: 2000, // 分隔代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分隔
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeTreshold: 50000, // 超过50kb的代码一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 缓存组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 优先级(越大越优先)
      //     reuseExistingChunk: true, // 如果当前chunk包含已从主bundle中提取的模块，则它将被重用，而不是生成一个新模块
      //   },
      // default: {
      // 其他没写的配置回事呀上面的默认值
      //   minChunks: 2, // 这里的minChunks权重更大
      //   priority: -20,
      //   reuseExistingChunk: true,
      // }
      // },
      // 修改配置
      cacheGroups: {
        //   defaultVendors: { // 组名
        //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //     priority: -10, // 优先级(越大越优先)
        //     reuseExistingChunk: true, // 如果当前chunk包含已从主bundle中提取的模块，则它将被重用，而不是生成一个新模块
        //   },
        default: {
          // 其他没写的配置回事呀上面的默认值
          minSize: 0,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
