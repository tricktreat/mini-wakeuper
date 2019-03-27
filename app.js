//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        let data = { "appid": "wxce0af3f23f9eee19", "secret": "3597e6cfb8339a61cacb77ced622d3f3", "js_code": res.code }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          // 这里将res.code送到后台，在数据库注册用户（首次使用）或者拉取数据库中的用户信息。
          method: "GET",
          data: data,
          url: this.globalData.baseUrl + 'userinfo/register',
          success: res => {
            res.data.data['birthday'] = new Date(res.data.data['birthday']).pattern("yyyy-MM-dd")
            this.globalData.userInfo = res.data.data
            // console.log(this.globalData.userInfo)
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      // 拿到最新的微信用户数据，静默更新到数据库，并且合并原来数据库中的手动设置的用户线信息字段
                      // res.userInfo.avatarUrl = res.userInfo.avatarUrl.replace(/\.wx\./,".thirdwx.")
                      Object.assign(this.globalData.userInfo, res.userInfo)
                      wx.request({
                        method: "POST",
                        url: this.globalData.baseUrl + 'userinfo/updateuser',
                        data: Object.assign({ openId: this.globalData.userInfo.openId }, res.userInfo),
                        success: res => {
                          // console.log(res)
                        }
                      })
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      // console.log(this.globalData.userInfo)
                      if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(this.globalData.userInfo)
                      }
                    }
                  })
                }
              }
            })
          }
        })
      },
    })
    Date.prototype.pattern = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours(),// % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
      };
      var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }       
    
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  refreshUserInfo(data, page) {
    wx.request({
      // 这里将res.code送到后台，在数据库注册用户（首次使用）或者拉取数据库中的用户信息。
      method: "GET",
      data: data,
      url: this.globalData.baseUrl + 'userinfo',
      success: res => {
        res.data.data['birthday'] = new Date(res.data.data['birthday']).pattern("yyyy-MM-dd")
        this.globalData.userInfo = res.data.data
        page.setData({
          userInfo: res.data.data
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: "https://app4.aobtain.cn/wakeup/", //"http://localhost:8888/",//
    signInStart: 3600 * 1000 * 6,
    signInEnd: 3600 * 1000 * 7 + 20 * 60 * 1000,
    setting: wx.getStorageSync('setting') || { "theme": "green", "circleIsCard": true, "swiperIsCard": false, "swiperDotIsRound": false, "gridCol": 4, "gridBorder": 0,'pageLimit':5 }
  }
})