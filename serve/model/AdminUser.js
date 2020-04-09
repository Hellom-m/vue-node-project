// 建立 管理员模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String },
    /**
     * set() => 自定义字段怎么修改怎么保存
     * bcrypt => 散列加密
     */
    password: {
        type: String,
        select: false,  // => 默认查数据时 不带出来
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema);