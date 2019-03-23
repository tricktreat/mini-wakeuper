const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    setting: app.globalData.setting,
    curTab:"day",
    rankList: []
  },
  onLoad: function () {
    this.setData({
      setting: app.globalData.setting,
    })
    this.getSigninRank("day")
  },
  getSigninRank(type){
    wx.request({
      url: app.globalData.baseUrl + 'signin/' + type,
      data: { date: new Date().setHours(0, 0, 0, 0) },
      success: res => {
        this.setData({
          rankList: res.data.data
        })
      }
    })
  },
  tabSelect(e){
    this.setData({ curTab: e.currentTarget.dataset.type})
    this.getSigninRank(e.currentTarget.dataset.type)
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});