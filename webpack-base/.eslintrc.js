module.exports = {
  // 继承Eslint规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
    es6: true, // 启用ES6语法
  },
  globals: {
    Promise: "readonly", // 明确指定 Promise 为全局只读变量
  },
  parserOptions: {
    ecmaVersion: "latest", // 指定ES版本
    sourceType: "module", // 指定ES模块
  },
  rules: {
    "no-var": 2, // 禁用var
  },
};
