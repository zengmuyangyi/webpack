module.exports = {
  // 智能预设，能够编译es6+的语法，但是不能编译async等新的语法
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 按需引入
        corejs: 3, // 指定core-js版本
      },
    ],
  ],
};
