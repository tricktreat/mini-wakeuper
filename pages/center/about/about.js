const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    setting: app.globalData.setting
  },
  onLoad: function () { 
    this.setData({
      setting: app.globalData.setting,
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});