//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    momentList:[],
    offset:0,
    limit:5
  },
  methods: {
    onLoad: function () {
      this.setData({
        setting: app.globalData.setting,
        userInfo: app.globalData.userInfo,
      })
      let para = { offset: this.data.offset, limit: app.globalData.setting.pageLimit }
      this.loadDate(para)
    },
    loadDate(para){
      wx.request({
        url: app.globalData.baseUrl + 'moment',
        data: para,
        success: res => {
          this.setData({
            momentList: this.data.momentList.concat(res.data.data),
            offset: this.data.offset + res.data.data.length
          })
        }
      })
    },
    toDetail(e){
      wx.navigateTo({
        url: '/pages/circle/detail/detail?moment='+JSON.stringify(e.currentTarget.dataset.moment),
      })
    },
    nextPage(e){
      let para = { offset: this.data.offset, limit: app.globalData.setting.pageLimit }
      this.loadDate(para)
    },
    onShow: function () {
      this.setData({
        setting: app.globalData.setting,
        userInfo: app.globalData.userInfo
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
    onShareAppMessage() {
      return {
        title: '一起加入WakeUp俱乐部吧~',
        imageUrl: 'https://blog.ibilidi.cn/images/welcome.jpg',
        path: 'pages/index/index/index'
      }
    },
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1,
          setting: app.globalData.setting
        })
      }
    }
  }
})