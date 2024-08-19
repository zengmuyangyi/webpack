const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugin");
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  module: {
    rules: [
      //   {
      //     test: /\.js$/,
      //     loader: "./loaders/test-loader.js",
      //   },
      {
        test: /\.js$/,
        // use: ["./loaders/demo/test1", "./loaders/demo/test2"],
        // loader: "./loaders/demo/test3.js",
        loader: "./loaders/clean-log-loader.js",
      },
      {
        test: /\.js$/,
        // use: ["./loaders/demo/test1", "./loaders/demo/test2"],
        // loader: "./loaders/demo/test3.js",
        loader: "./loaders/banner-loader",
        options: {
          author: "曾杨",
          //   age: 18, // 不能新增字段，不然会报错
        },
      },
      {
        test: /\.js$/,
        // use: ["./loaders/demo/test1", "./loaders/demo/test2"],
        // loader: "./loaders/demo/test3.js",
        loader: "./loaders/babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "./loaders/file-loader",
        type: "javascript/auto", // 阻止webpack默认处理图片资源，只使用file-loader处理
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: ["./loaders/style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    // new TestPlugin(),
    new BannerWebpackPlugin({
      author: "曾杨",
    }),
  ],
  mode: "development",
};
