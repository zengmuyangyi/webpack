/*
    loader就是一个函数
    当webpack解析资源时，会调用相应的loader去处理
    loader接收到文件内容作为参数, 返回处理后的内容
      content: 文件内容
      map: 文件内容映射
      meta: 别的loader传递的参数
*/
module.exports = function (content, map, meta) {
  console.log(content);
  return content;
};
