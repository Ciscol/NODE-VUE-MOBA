const express = require('express');
const app = express();
const port = 3000;

app.set('secretKey', 'sdhft5643fdg523g415634'); // 生成token时采用的密钥

app.use(require('cors')()); // 跨域
app.use(express.json());    // json转object
app.use('/uploads', express.static(__dirname + '/uploads')); // 上传文件路径的重定向

require('./plugins/db')(app);    // 连接数据库
require('./routes/admin')(app);  // 路由器注册——admin
require('./routes/web')(app);  // 路由器注册——web

app.listen(port, () => console.log(`Example app listening on ${port} port!`));