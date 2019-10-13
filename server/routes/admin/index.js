/* 路由 */
module.exports = app => {
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert');
  const express = require('express');
  const router = express.Router({ mergeParams: true });
  const AdminUser = require('../../models/AdminUser');            // 管理员用户数据模型
  const authMiddleWare = require('../../middleware/auth');        // 用户验证
  const resourceMiddleWare = require('../../middleware/resource');// 请求资源（数据模型）获取

  /* post 插入数据 */
  router.post('/', async function (req, res) {
    const model = await req.Model.create(req.body);
    res.send(model);  // 返回新数据
  })

  /* put 更新数据 */
  router.put('/:id', async function (req, res) {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  })

  /* delete 删除数据 */
  router.delete('/:id', async function (req, res) {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    });
  })

  router.head('/', async function (req, res) {
  });

  /* get 获取数据列表 */
  router.get('/', async function (req, res) {
    const queryOptions = {};
    // 数据模型的发送处理
    switch (req.Model.modelName) {
      case 'Category':
        queryOptions.populate = 'parent';   // 将parent（id）转化为父类信息
        break;
      default:
        break;
    }
    // 暂时只设置为limit10，实际上应该用skip
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  })

  /* get 获取数据项 */
  router.get('/:id', async function (req, res) {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  })


  /* 登陆验证、获取数据模型 */
  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router);

  /* 上传文件 */
  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file); // 上传成功后返回资源路径
  })

  /* 管理员用户登录 */
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 验证用户名
    const user = await AdminUser.findOne({ username }).select('+password');
    assert(user, 422, '用户不存在');
    // 验证密码0
    const isValid = require('bcrypt').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');
    // 生成token 并 返回
    const token = jwt.sign({ id: user._id }, app.get('secretKey'));
    res.send({ token })
  })

  /* 捕获assert抛出的错误等异常 */
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(
      {
        message: err.message
      }
    )
  })

}