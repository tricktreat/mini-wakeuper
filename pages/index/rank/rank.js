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
    let para={}
    if(type=="day"){
      para["date"] = new Date().setHours(0, 0, 0, 0)
    }
    if(type=="month"){
      let now = new Date()
      let today= new Date(now.setDate(0))
      para["month"] = today.setHours(0, 0, 0, 0)
    }
    wx.request({
      url: app.globalData.baseUrl + 'signin/' + type,
      data: para,
      success: res => {
        let _ranklist = res.data.data
        for (let item of _ranklist){
          item.signTime = new Date(item.signTime).toLocaleTimeString()
        }
        this.setData({
          rankList: _ranklist
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