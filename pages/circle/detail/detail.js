//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  methods: {
    onLoad: function (e) {
      
      this.setData({
        setting: app.globalData.setting,
        userInfo: app.globalData.userInfo,
        moment: JSON.parse(e.moment)
      })
    
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