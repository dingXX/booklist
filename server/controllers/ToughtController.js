const ThoughtService =  require('../services/ToughtService');
exports.actions = {
    index:{
        isAPI:false,
        method:'get',
    },
    add:{
        isAPI: true,
        method: 'post'
    },
    delete:{
        isAPI: true,
        method: 'post'
    },
    list:{
        isAPI:true,
        method:'get',
    },
    detail:{
        isAPI:true,
        method:'get',
    }
};
exports.actionIndex = async function (ctx){
    let html = `
          <h1>koa2 request post demo</h1>
          <form method="POST" action="/api/tought/add">
            <p>type</p>
            <input name="type" value="movie" /><br/>
            <p>name</p>
            <input name="name" value="楚门的世界"/><br/>
            <p>content</p>
            <input name="content" value="监控的世界真恐怖"/><br/>
            <button type="submit">submit</button>
          </form>
        `;
    ctx.body = html
};
exports.actionAdd = async function (ctx) {
    const openId = ctx.cookies.get('openId');
    const body = ctx.request.body;
    try{
        const thoughtService = new ThoughtService(openId);
        const myThought = await thoughtService.addThought(body);
        ctx.JsonResponse.success(myThought);
    }catch(err){
        return ctx.JsonResponse.error(err);

    }
};
exports.actionDelete = async function(ctx){

};
exports.actionList = async function(ctx){

};
exports.actionDetail = async function(ctx){

};


// https://movie.douban.com/j/review/1640434/full