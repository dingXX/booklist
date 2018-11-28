//app.js
import {login} from './api/api';
App({
    onLaunch: function() {
        login();
    },
    globalData: {}
})