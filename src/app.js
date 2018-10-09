//app.js
App({
  onLaunch: function () {
    wx.login({
      success:ret=>{
        console.log(ret);
      }
    });
  },
  globalData: {
  }
})
// 023tVvDU1tGkLW02FDBU1kFkDU1tVvDq