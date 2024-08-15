const schema = require("./schema.json");
module.exports = function (content) {
  // schema对options的校验规则
  // schema符合JSON Schema规范
  const options = this.getOptions(schema);
  const prefix = `
        /*
        * @Author: ${options.author}
        */
    `;
  return prefix + content;
};
