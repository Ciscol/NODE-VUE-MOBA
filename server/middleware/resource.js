/* 根据所请求资源名，提取不同的数据模型 */
module.exports = options => {
  return async (req, res, next) => {
    // inflection是一个将复数明此转化为单数首字母大写的工具，如：users => User
    const modelName = require('inflection').classify(req.params.resource);  // 获取资源名
    req.Model = require(`../models/${modelName}`);  // 分配数据模型
    next();
  }
}