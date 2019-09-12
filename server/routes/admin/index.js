/* 路由器 */
module.exports = app => {
  const express = require('express');
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../../models/AdminUser');
  const assert = require('http-assert');
  const router = express.Router({
    mergeParams: true
  });

  const authMiddleWare = require('../../middleware/auth')

  const resourceMiddleWare = require('../../middleware/resource')

  router.post('/', async function (req, res) {
    const model = await req.Model.create(req.body);
    res.send(model);
  })

  router.put('/:id', async function (req, res) {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  })

  router.delete('/:id', async function (req, res) {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    });
  })

  router.get('/', async function (req, res) {
    const queryOptions = {};
    switch (req.Model.modelName) {
      case 'Category':
        queryOptions.populate = 'parent'
        break;
      default:
        break;
    }

    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  })

  router.head('/', async function (req, res) {
  })

  router.get('/:id', async function (req, res) {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  })
  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router);

  // 上传文件
  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await AdminUser.findOne({ username }).select('+password');
    assert(user, 422, '用户不存在');
    // if (!user) {
    //   return res.status(422).send({ message: '用户不存在' });
    // }

    const isValid = require('bcrypt').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');

    const token = jwt.sign({ id: user._id }, app.get('secretKey'));
    res.send({ token })
  })

  // 捕获assert抛出的错误等异常
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(
      {
        message: err.message
      }
    )
  })

}