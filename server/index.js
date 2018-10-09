const Koa = require('koa');
const routers = require('./routers');
const path = require('path');
const staticResource = require('koa-static');
const app = new Koa();
routers(app);

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';

app.use(staticResource(
  path.join( __dirname,  staticPath)
));

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})