// 建立路由
module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../model/Category');

    // 新建分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })

    // 获取分类列表
    router.get('/categories', async (req, res) => {
        const data = await Category.find().limit(10);
        res.send(data);
    })

    // 路由挂载
    app.use('/admin/api', router);
}