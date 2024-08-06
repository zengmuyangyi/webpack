import count from "./js/count";
import sum from "./js/sum";
// 想webpack打包资源，必须引入资源
import "./css/index.css";
import "./less/index.less";
import "./scss/index.scss";
import "./stylus/index.styl";
import "./css/iconfont.css";
// 完整引入
// import "core-js";
// 按需加载
// import "core-js/es/promise";

console.log(count(10, 20));
console.log(sum(10, 20, 30, 40));
// 判断是否支持HMR功能
if (module.hot) {
  console.log("^^^");
  module.hot.accept("./js/count.js");
  module.hot.accept("./js/sum.js");
}
document.getElementById("btn").onclick = function () {
  // eslint不能识别动态导入语法，需要额外追加配置
  // /* webpackChunkName: "math" */ webpack魔法命名
  import(/* webpackChunkName: "math" */ "./js/math").then(({ mul }) => {
    console.log(mul(3, 3));
  });
};

new Promise((resolve) => {
  setTimeout(() => {
    console.log("测试");
    resolve();
  }, 1000);
});

const arr = [1, 2, 3, 4];
console.log(arr.includes(1));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
