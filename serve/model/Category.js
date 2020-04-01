// 建立模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String },
    /*
        type: mongodb的类型id
        ref: 关联的模型
    */
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema);