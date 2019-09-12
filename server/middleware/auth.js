module.exports = options => {
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../models/AdminUser');
  const assert = require('http-assert');
  return async (req, res, next) => {
    try {
      const token = String(req.headers.authorization).split(' ').pop();
      const { id } = jwt.verify(token, req.app.get('secretKey'))
      req.user = await AdminUser.findById(id);
    } catch (error) {
      assert(false, 401, '请先登录');
    }
    await next();
  }
}