const express = require('express');
const app = express();
const port = 3000;

app.use(require('cors')()); // 跨域
app.use(express.json());    // 数据

require('./plugins/db')(app)    // 连接数据库
require('./routes/admin')(app)  // 路由器注册

app.listen(port, () => console.log(`Example app listening on port port!`))