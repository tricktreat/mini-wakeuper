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
  onShareAppMessage() {
    return {
      title: '一起加入WakeUp俱乐部吧~',
      imageUrl: 'https://blog.ibilidi.cn/images/welcome.jpg',
      path: 'pages/index/index/index'
    }
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});