import '../vendors/wxPromise.min.js';
export function login() {
    wx.pro.login().then(res => {
        if (res.code) {
            return wx.pro.request({
                url:'https://booklist.futunn.com/api/login/index',
                method:'POST',
                data:{
                    js_code:res.code
                }
            });
        } else {
            throw res;
        }
    }).then(res =>{
        console.log(res);
    }).catch(err => {

    });
}