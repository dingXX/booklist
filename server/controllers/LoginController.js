
exports.actions = {
    index: { isAPI: false, method: 'get'},
    participate: { isAPI:true, method: 'get'}
};

exports.actionIndex = async function(ctx) {
    ctx.body = '404 page!';
};

exports.actionParticipate = async function(ctx) {
    ctx.body = 'actionParticipate';
};