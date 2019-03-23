const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    setting: app.globalData.setting,
    theme: [
      { "name": "魅红", "color": "red" },
      { "name": "鎏金", "color": "orange" },
      { "name": "翠柳", "color": "green" },
      { "name": "靛青", "color": "blue" },
      { "name": "惑紫", "color": "purple" },
      { "name": "霞彩", "color": "pink" },]
  },
  onLoad: function () {
    this.setData({
      setting: app.globalData.setting,
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  settingChange(e) {

    let _setting=this.data.setting
    _setting[e.target.dataset.type]=e.detail.value
    app.globalData.setting = _setting
    this.setData({
      setting: _setting
    })
    wx.setStorage({
      key: 'setting',
      data: app.globalData.setting,
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});