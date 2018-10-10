/**
 * Created by user on 17/2/17.
 */
class JsonResponse {
    constructor(ctx) {
        this.ctx = ctx;
    }

    success(data = []) {
        this.ctx.set('Content-Type', 'application/json');
        this.ctx.body = {
            code: 0,
            message: '成功',
            data: data
        };
    }

    error(code = 500, message = '网络异常', data = []) {
        this.ctx.set('Content-Type', 'application/json');
        this.ctx.body = { code, message, data };
    }
};

module.exports = (app) => {
    Object.defineProperty(app.context, 'JsonResponse', {
        get: function() {
            if (this._JsonResponse) {
                return this._JsonResponse;
            }

            const jsonResponse = new JsonResponse(this);
            this._JsonResponse = jsonResponse;
            return jsonResponse;
        }
    });
};