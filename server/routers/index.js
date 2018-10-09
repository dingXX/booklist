const KoaRouter = require('koa-router');
const fs = require('fs');
let router = new KoaRouter();
const controllers = fs.readdirSync(__dirname + '/../controllers');

controllers.forEach(function (item) {
    let controller = require('../controllers/' + item);
    let tmp = item.slice(0, -13);
    console.log(tmp);
    let baseRoute = tmp.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
    // { index: { scope: '?', isAPI: false, method: 'get' } }
    let actions = Object.keys(controller.actions || {});
    if (actions.length > 0) {
        actions.forEach(function (action) {
            let routePath = controller.actions[action].isAPI ? '/api' : '';
            let parts = action.split('-');
            const actionMethod = parts.map(function (part) {
                return part.substring(0, 1).toUpperCase() + part.slice(1);
            }).join('');
            routePath += '/' + baseRoute + '/' + action;
            console.log(routePath);
            router[controller.actions[action].method](
                routePath,
                controller['action' + actionMethod]);
            if (action === 'index') {
                router[controller.actions[action].method](
                    routePath.slice(0, -6),
                    controller['action' + action.substring(0, 1).toUpperCase() + action.slice(1)]);
            }
        });
    }
})

module.exports =  app => {
    // 加载路由中间件
    app.use(router.routes()).use(router.allowedMethods());
};
