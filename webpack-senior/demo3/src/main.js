import { sum } from "./math";
// import count from "./count";

console.log(sum(6, 7, 8, 9));
console.log("hello main");

document.getElementById("btn").onclick = function () {
  // import 动态导入，会将动态导入的文件代码分隔（拆分成单独的模块），在需要使用的时候自动加载
  // /* webpackChunkName: "count" */ webpack魔法命名
  import(/* webpackChunkName: "count" */ "./count")
    .then((res) => {
      console.log("模块加载成功", res.default(2, 1));
    })
    .catch((err) => {
      console.log("模块加载失败", err);
    });
};
