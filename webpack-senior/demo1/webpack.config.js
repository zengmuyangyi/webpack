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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"), // 指定模板文件
    }),
  ],
  mode: "production",
};
