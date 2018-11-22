const Koa = require('koa');
const routers = require('./routers');
const jsonResponse = require('./routers/jsonResponse');
const path = require('path');
const staticResource = require('koa-static');
const koaBody = require('koa-body');
const session = require('koa-session-minimal');
// 使用ctx.body解析中间件
const app = new Koa();
app.use(koaBody());
// 应用处理 session 的中间件
app.use(session({
    key: 'session_id',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
    cookie: {                   // 与 cookie 相关的配置
        path: '/',              // 写 cookie 所在的路径
        maxAge: 1000*60*60*24*14,      // cookie 有效时长
        httpOnly: true,         // 是否只用于 http 请求中获取
        overwrite: false        // 是否允许重写
    }
}));


routers(app);
jsonResponse(app);


// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';

app.use(staticResource(
    path.join(__dirname, staticPath)
));


app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})