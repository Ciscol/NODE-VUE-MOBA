/* mongoDB数据模型 —— 英雄信息 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  professions: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficulty: { type: Number },
    skill: { type: Number },
    attack: { type: Number },
    survival: { type: Number },
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
  }],
  EquipRecommen: {
    item1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    item2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }]
  },
  usageTips: { type: String },
  combatTips: { type: String },
  meleeTips: { type: String },
  heroRelationship: {
    partners: [{
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String }
    }]
  }

})

module.exports = mongoose.model('Hero', schema);