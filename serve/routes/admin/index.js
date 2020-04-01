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

    // 编辑分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 获取分类列表
    router.get('/categories', async (req, res) => {
        // 获取关联的 parent
        const data = await Category.find().populate('parent').limit(10);
        res.send(data);
    })

    // 获取分类详情
    router.get('/categories/:id', async (req, res) => {
        const data = await Category.findById(req.params.id);
        res.send(data);
    })

    // 删除分类列表的数据
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    })

    // 路由挂载
    app.use('/admin/api', router);
}