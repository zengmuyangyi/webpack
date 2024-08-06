const path = require("path"); // 引入path模块
const ESLintPlugin = require("eslint-webpack-plugin"); // 引入ESLint插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入html-webpack-plugin插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 引入mini-css-extract-plugin插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // 引入css压缩插件
const os = require("os"); // 引入os模块
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 引入terser-webpack-plugin插件
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin"); // 引入workbox-webpack-plugin插件(PWA断线插件)

const threads = os.cpus().length; // 获取cpu核心数
/**
 * 获取样式加载器数组
 *
 * @param pre 自定义加载器
 * @returns 样式加载器数组
 */
function getStyleLoader(pre) {
  return [
    // 执行顺序，从后往前执行
    MiniCssExtractPlugin.loader, // 将js中css通过创建style标签添加到html文件中生成
    "css-loader", // 将css文件转换成commonjs模块加载到页面中
    {
      loader: "postcss-loader", // 自动添加浏览器前缀
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决绝大多数样式兼容性问题
          ],
        },
      },
    },
    pre,
  ].filter(Boolean);
}

module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 输出
  output: {
    // 所有文件的输出路径
    path: path.resolve(__dirname, "../dist"), // 绝对路径
    // 入口文件打包输出文件名
    // [contenthash:8]使用contenthash(根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化)
    filename: "assets/js/[name].[contenthash:8].js",
    // 打包输出的其他文件命名
    chunkFilename: "assets/js/[name].[contenthash:8].chunk.js",
    // 静态资源文件打包输出文件名
    // [hash:10] 打包文件hash值，长度为10
    assetModuleFilename: "assets/[hash:10][ext][query]",
    clean: true, // 在生成文件之前清空 output 目录
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/, // 只监测.css结尾的文件
        use: getStyleLoader(),
      },
      {
        test: /\.less$/,
        use: getStyleLoader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoader("stylus-loader"),
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
        generator: {
          // 输出图片名称
          // [hash:10] 打包文件hash值，长度为10
          filename: "assets/images/[hash:10][ext][query]",
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
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css", // 指定打包输出的文件
      chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
    }),
    // new CssMinimizerPlugin(),
    // new TerserWebpackPlugin({
    //   parallel: threads, // 开启几个线程来压缩
    // }),
    new PreloadWebpackPlugin({
      // rel: "preload", // 指定资源类型
      // as: "script", // 指定引入类型
      rel: "prefetch", //兼容性较差
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // 客户端开始控制页面
      skipWaiting: true, // 强制等待
    }),
  ],
  // webpack5习惯将压缩配置单独抽离出来至此
  optimization: {
    // 压缩配置
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin({
        parallel: threads, // 开启几个线程来压缩
      }),
      // 压缩图片
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminGenerate,
      //     options: {
      //       plugins: [
      //         "imagemin-gifsicle",
      //         "imagemin-mozjpeg",
      //         "imagemin-pngquant",
      //         "imagemin-svgo",
      //       ],
      //     },
      //   },
      // }),
    ],
    // 代码分割
    splitChunks: {
      chunks: "all", // 默认值，自动分割代码块
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, // 指定入口文件名称
    },
  },
  // 模式
  mode: "production", // 生产环境
  devtool: "source-map", // 生成source-map文件，方便调试
};
