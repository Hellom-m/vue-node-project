module.exports = options => {
    return async (req, res, next) => {
        // 使用 inflection 将客户端调用的接口地址参数 转换为大写 Model 的值 categories => Category
        const modelName = require('inflection').classify(req.params.resource);

        // 将引用的 Model 挂载在 req 上，便于 router 中使用
        req.Model = require(`../model/${modelName}`);

        // 然后在执行下一步
        next()
    }
}