const ThoughtService =  require('../services/ThoughtService');
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
    },
    update:{
        isAPI:true,
        method:'post',
    }
};
exports.actionIndex = async function (ctx){
    let html = `
          <h1>koa2 request post demo</h1>
          <form method="POST" action="/api/thought/add">
            <p>type</p>
            <input name="type" value="movie" /><br/>
            <p>name</p>
            <input name="name" value="楚门的世界"/><br/>
            <p>content</p>
            <input name="content" value="监控的世界真恐怖"/><br/>
            <button type="submit">submit</button>
          </form>

          <h1>删除感想</h1>
          <form method="POST" action="/api/thought/delete">
            <p>thoughtId</p>
            <input name="thoughtId" value="" /><br/>
            <button type="submit">submit</button>
          </form>

          <h1>更新感想</h1>
          <form method="POST" action="/api/thought/update">
            <p>id</p>
            <input name="thoughtId" value=""/><br/>
            <p>content</p>
            <input name="content" value="监控的世界真恐怖啊啊啊"/><br/>
            <button type="submit">submit</button>
          </form>
        `;
    ctx.session = {uid:1};
    ctx.body = html;

};
exports.actionAdd = async function (ctx) {
    const uid = ctx.session.uid;
    const body = ctx.request.body;
    try{
        const thoughtService = new ThoughtService(uid);
        const myThought = await thoughtService.addThought(body);
        ctx.JsonResponse.success(myThought);
    }catch(err){
        console.log(err);
        return ctx.JsonResponse.error(100,err);

    }
};
exports.actionDelete = async function(ctx){
    const uid = ctx.session.uid;
    const thoughtId = ctx.request.body.thoughtId;
    if (uid && thoughtId) {
        try{
            const thoughtService = new ThoughtService(uid);
            const result = await thoughtService.deleteThought(thoughtId);
            ctx.JsonResponse.success();


        }catch(err){
            console.log(err);
            return ctx.JsonResponse.error(100,err);
        }
    }
};
exports.actionList = async function(ctx){
    let uid = ctx.session.uid;
    uid=1;
    if (uid) {
        try{
            const thoughtService = new ThoughtService(uid);
            const list = await thoughtService.listThought();
            console.log(list);
            ctx.JsonResponse.success(list);
        }catch(err){
            console.log(err);
            return ctx.JsonResponse.error(100,err);
        }
    }
};
exports.actionDetail = async function(ctx){
    const uid = ctx.session.uid || 1;
    const {thoughtId} = ctx.request.query;
    console.log(thoughtId,'thoughtId');
    if (uid && thoughtId) {
        try{
            const thoughtService = new ThoughtService(uid);
            const detail = await thoughtService.detailThought(thoughtId);
            ctx.JsonResponse.success(detail);
        }
        catch(err){
            console.log(err);
            return ctx.JsonResponse.error(100,err);
        }
    }
};
exports.actionUpdate = async function(ctx){
    const uid = ctx.session.uid;
    const body = ctx.request.body;
    if(uid && body.thoughtId){
        try{
            const thoughtService = new ThoughtService(uid);
            const myThought = await thoughtService.updateThought(body);
            ctx.JsonResponse.success();
        }catch(err){
            console.log(err);
            return ctx.JsonResponse.error(100,err);

        }
    }
};


// https://movie.douban.com/j/review/1640434/full