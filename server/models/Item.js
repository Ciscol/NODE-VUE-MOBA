/* mongoDB数据模型 —— 物品（装备）*/
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
})

module.exports = mongoose.model('Item', schema);