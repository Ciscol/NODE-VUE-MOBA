/* 用户态验证 */
module.exports = options => {
  const jwt = require('jsonwebtoken');                // token工具
  const AdminUser = require('../models/AdminUser');   // 数据模型 —— 管理员用户
  const assert = require('http-assert');              // 错误信息response工具
  
  /* 返回一个异步函数 —— 进行用户态验证 */
  return async (req, res, next) => {
    try {
      const token = String(req.headers.authorization).split(' ').pop(); // header中获取token
      const { id } = jwt.verify(token, req.app.get('secretKey'));       // 根据密钥，从token中获取id
      req.user = await AdminUser.findById(id);        // 数据库验证id
    } catch (error) {
      assert(false, 401, '请先登录');
    }
    await next();
  }
}