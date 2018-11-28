import '../vendors/wxPromise.min.js';
export function login(code) {
    return wx.pro.request({
        url:'https://booklist.futunn.com/api/login/index',
        method:'POST',
        data:{
            js_code:code
        }
    });
}