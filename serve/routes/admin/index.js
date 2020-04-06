// 建立通用的CRUD组件路由
module.exports = app => {
    const express = require('express');
   /**
    *   mergeParams: 保存来自上一个路由的res.params的值，如果当前路由的值和上一个路由的值冲突则会覆盖上一个值。
    */
    const router = express.Router({
        mergeParams: true
    });

    // 新建分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 编辑分类
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 获取分类列表
    router.get('/', async (req, res) => {
        /**
         * @description 获取关联的 parent
         * populate函数（联表）：在文档中引用另一个集合的文档，并将齐填充到文档的指定路径中
         */ 
        let queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const data = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(data);
    })

    // 获取分类详情
    router.get('/:id', async (req, res) => {
        const data = await req.Model.modeName.findById(req.params.id);
        res.send(data);
    })

    // 删除分类列表的数据
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    })

    /**
     * app.use(path,callback)中的 callback 既可以是 router 对象也可以是函数
     * async函数：自定义中间件，用于引入通用的模型
     */
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        // 使用 inflection 将客户端调用的接口地址参数 转换为大写 Model 的值 categories => Category
        const modelName = require('inflection').classify(req.params.resource);

        // 将引用的 Model 挂载在 req 上，便于 router 中使用
        req.Model = require(`../../model/${modelName}`);

        // 然后在执行下一步
        next()
    }, router);
}