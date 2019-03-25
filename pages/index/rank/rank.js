const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    setting: app.globalData.setting,
    curTab: "day",
    curIndex: 0,
    tabList: ["day", "month", "all"],
    rankList: []
  },
  onLoad: function () {
    this.setData({
      setting: app.globalData.setting,
    })
    this.getSigninRank("day")
  },
  handletouchmove(event) {
  },
  handletouchtart: function (event) {
    this.data.startX = event.changedTouches[0].pageX
    this.data.startY = event.changedTouches[0].pageY
  },

  handletouchend: function (event) {
    let endX = event.changedTouches[0].pageX
    let endY = event.changedTouches[0].pageY
    let _curIndex = this.data.curIndex
    if (Math.abs(endX - this.data.startX) > 60) {
      _curIndex = (endX - this.data.startX)>0 ? _curIndex - 1 : _curIndex + 1
      if (_curIndex > -1 && _curIndex < 3) {
        this.setData({
          curIndex: _curIndex,
          curTab: this.data.tabList[_curIndex]
        })
        this.getSigninRank(this.data.curTab)
      }
    }
  },
  getSigninRank(type) {
    let para = {}
    let now = new Date()
    let year = now.getFullYear().toString()
    let month = (now.getMonth() + 1).toString()
    let date = now.getDate().toString()

    if (type == "day") {
      para["date"] = year + "-" + (month[1] ? month : '0' + month) + "-" + (date[1] ? date : '0' + date)
    }
    if (type == "month") {
      para["month"] = year + "-" + (month[1] ? month : '0' + month) + "-01"
    }
    wx.request({
      url: app.globalData.baseUrl + 'signin/' + type,
      data: para,
      success: res => {
        let _ranklist = res.data.data
        for (let item of _ranklist) {
          item.signTime = new Date(item.signTime).toLocaleTimeString()
        }
        this.setData({
          rankList: _ranklist
        })
      }
    })
  },
  tabSelect(e) {
    this.setData({ curTab: e.currentTarget.dataset.type })
    this.getSigninRank(e.currentTarget.dataset.type)
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});