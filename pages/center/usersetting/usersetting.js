const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    setting: app.globalData.setting,
    userInfo: app.globalData.userInfo,
    time: '12:01',
    picker: ['阳澄湖', '独墅湖', '天赐庄'],
    date: '2018-12-25',
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