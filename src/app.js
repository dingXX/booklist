//app.js
import {
    login
} from './api/api';
App({
    onLaunch: function() {
        wx.pro.login().then(res => {
            if (res.code) {
                return login(res.code);
            } else {
                throw res;
            }
        }).then(res=>{
            console.log(res.data);
        }).catch(err=>{

        });
    },
    globalData: {}
})