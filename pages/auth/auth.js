//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: '欢迎使用wakeup俱乐部活动平台',
    userInfo: {},
    setting:{},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad:function(){
    this.setData({
      setting: app.globalData.setting
    })
  },
  getUserInfo: function(e) {
    Object.assign(app.globalData.userInfo , e.detail.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
    })
    wx.switchTab({
      // 这里将微信用户信息添加到数据库
      url: '/pages/index/index/index',
    })
  }
})
