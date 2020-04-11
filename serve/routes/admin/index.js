module.exports = app => {
    // 建立通用的CRUD组件路由
    const express = require('express');
    /**
     *   mergeParams: 保存来自上一个路由的res.params的值，如果当前路由的值和上一个路由的值冲突则会覆盖上一个值。
     */
    const router = express.Router({
        mergeParams: true
    });


    // 引入 管理员 模型
    const AdminUser = require('../../model/AdminUser');
    // 引入 生成 token 的包
    const jwt = require('jsonwebtoken');
    // 引入 http 全局错误提示
    const assert = require('http-assert')

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
        const data = await req.Model.findById(req.params.id);
        res.send(data);
    })

    // 删除分类列表的数据
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    })

    // 登录校验中间件
    const authMiddleWare = require('../../middleware/auth');

    // model 来源中间件
    const resourceMiddleWare = require('../../middleware/resource');

    /**
     * app.use(path,callback)中的 callback 既可以是 router 对象也可以是函数
     * async函数：自定义中间件，用于引入通用的模型
     */
    app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router);

    // 图片上传接口
    // multer: 用于获取上传数据的中间件
    const multer = require('multer');
    /**
     * multer(): 执行 multer 方法并把上传后的图片 指定放在 uploads文件夹中
     * __dirname: 指向被执行js文件的绝对路径
     */
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file);
    })


    //登录接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        //1. 根据用户名找用户

        /**
         * .select() => 前缀 - 被排除，前缀 + 被强制选择
         */
        const user = await AdminUser.findOne({ username }).select('+password');
        assert(user, 422, "用户不存在");

        //2. 校验密码
        const isVaild = require('bcrypt').compareSync(password, user.password)

        assert(isVaild, 422, "密码错误");

        /**
         * @description 3. 返回token
         * @function jwt.sign(): 接受两个参数 1. 需要放在token里面的数据
         *                        2. 根据 秘钥 校验客户端是否篡改
         * 
         * app.get('secret') => 1. 传一个参数是获取配置变量的值
         *                      2. 传两个参数是获取路由
         */

        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({ token })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        console.log(err);
        res.status(err.status).send({
            message: err.message
        })
    })
}