// 同步loader
// module.exports = function (content) {
//   return content;
// };

module.exports = function (content, map, meta) {
  console.log("test1");
  /*
    第一个参数：err 代表是否有错误
    第二个参数：content代表处理后的内容
    第三个参数：source-map 继续传递source-map
    第四个参数：meta 传递给下一个loader传递参数
  */
  this.callback(null, content, map, meta);
};
