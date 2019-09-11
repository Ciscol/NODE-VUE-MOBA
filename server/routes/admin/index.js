/* 路由器 */
module.exports = app => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true
  });

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

      // case 'Article':
      //   queryOptions.populate = 'categories[0]'
      //   break;

      default:
        break;
    }

    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  })

  router.get('/:id', async function (req, res) {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  })
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require(`../../models/${modelName}`);
    next();
  }, router);

  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  })
}