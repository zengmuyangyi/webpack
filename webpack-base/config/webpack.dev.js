const path = require("path"); // 引入path模块
const ESLintPlugin = require("eslint-webpack-plugin"); // 引入ESLint插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入html-webpack-plugin插件
const os = require("os"); // 引入os模块
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 引入terser-webpack-plugin插件

const threads = os.cpus().length; // 获取cpu核心数
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 输出
  output: {
    // 所有文件的输出路径
    // 开发模式没有输出
    path: undefined, // 绝对路径
    // 入口文件打包输出文件名
    filename: "assets/main.js",
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        // 每个文件只能被其中一个loader配置处理
        oneOf: [
          {
            test: /\.css$/, // 只监测.css结尾的文件
            use: [
              // 执行顺序，从后往前执行
              "style-loader", // 将js中css通过创建style标签添加到html文件中生成
              "css-loader", // 将css文件转换成commonjs模块加载到页面中
            ],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset", // 会转base64格式
            parser: {
              dataUrlCondition: {
                // 小于10kb的图片自动转成base64格式，否则使用file-loader
                // 优点：减少http请求   缺点：图片体积会更大
                maxSize: 10 * 1024, // 10kb
              },
            },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: "asset/resource", // 不会转base64格式
            generator: {
              // 输出名称
              filename: "assets/fonts/[hash:10][ext][query]",
            },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules目录
            include: path.resolve(__dirname, "../src"), // 只处理src下的文件目录
            use: [
              {
                loader: "thread-loader", // 开启多线程打包,
                options: {
                  workers: threads, // 开启几个线程
                },
              },
              {
                loader: "babel-loader", // 指定使用的loader
                // 指定使用的loader
                options: {
                  cacheDirectory: true, // 开启缓存
                  cacheCompression: false, // 关闭缓存压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    // 插件的配置
    // esLint插件
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"), // 指定检查的目录
      exclude: "node_modules", // 排除node_modules目录
      cache: true, // 开启缓存，减少检测时间
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslint"), // 指定缓存文件
      threads: threads, // 开启几个线程来检测
    }),
    new HtmlWebpackPlugin({
      // 新的html文件特定：1.结构和原来一直 2.自动引入打包输出的所有资源文件
      template: path.resolve(__dirname, "../public/index.html"), // 指定模板文件
    }),
  ],
  // 开发服务器：不会输出资源，在内存中编译，提供实时预览
  devServer: {
    host: "127.0.0.1", // 指定服务器ip
    port: "3000", // 指定端口号
    open: true, // 自动打开浏览器
    hot: true, // 热更新，开启hmr
  },
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map", // 生成sourcemap文件
};
