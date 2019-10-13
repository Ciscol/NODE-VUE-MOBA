/* mongoDB数据模型 —— 管理员用户 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10);
    }
  }
})

module.exports = mongoose.model('AdminUser', schema);