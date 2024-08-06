import count from "./js/count";
import sum from "./js/sum";
// 想webpack打包资源，必须引入资源
import "./css/index.css";
import "./less/index.less";
import "./scss/index.scss";
import "./stylus/index.styl";
import "./css/iconfont.css";

console.log(count(10, 20));
console.log(sum(10, 20, 30, 40));
// 判断是否支持HMR功能
if (module.hot) {
  console.log("^^^");
  module.hot.accept("./js/count.js");
  module.hot.accept("./js/sum.js");
}
