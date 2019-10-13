/* mongoDB数据模型 —— 广告 —— 轮播图 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  items: [
    {
      imageUrl: { type: String },
      directionUrl: { type: String }
    }
  ]
})

module.exports = mongoose.model('Ad', schema);