// 建立 英雄模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    // 英雄类型 数组形式 表示不止一个类型
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number },
        skill: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    skills: [
        {
            icon: { type: String },
            name: { type: String },
            desc: { type: String },
            tips: { type: String }
        }
    ],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [
        {
            hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
            desc: { type: String }
        }
    ]
})

module.exports = mongoose.model('Hero', schema);