/* mongoDB数据模型 —— 分类*/
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

module.exports = mongoose.model('Category', schema);