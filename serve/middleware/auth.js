module.exports = options => {
    // 引入 管理员 模型
    const AdminUser = require('../model/AdminUser');
    // 引入 生成 token 的包
    const jwt = require('jsonwebtoken');
    // 引入 http 全局错误提示
    const assert = require('http-assert')

    return async (req, res, next) => {
        // 获取 token
        const token = String(req.headers.authorization || '').split(' ').pop();
        assert(token, 401, "请先登录");
        // 解密 token 中的数据
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, "请先登录");

        req.user = await AdminUser.findById(id)
        assert(req.user, 401, "请先登录");

        await next()
    }
}