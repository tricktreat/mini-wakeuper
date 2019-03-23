//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    setting: {},
    showLoadModal:0,
    modalName:null,
    loadingModal: { message: "请稍后..." },
    imageModal: { imgurl:"https://albedo-theme.com/wp-content/uploads/2016/08/pexels-photo-26180.jpg",confirm:"我知道了"},
    basicModal:{title:"Modal标题",message:"Modal内容"},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    studyIconList: [{
      icon: 'hotfill',
      color: 'red',
      badge: 1,
      name: '早起签到',
      path: "/pages/index/signin/signin"
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜',
      path: "/pages/index/rank/rank"
    }, {
      icon: 'loading2',
      color: 'orange',
      badge: 0,
      name: '开发中'
    }, {
      icon: 'loading2',
      color: 'yellow',
      badge: 0,
      name: '开发中'
    }],
    lifeIconList: [
      {
        icon: 'noticefill',
        color: 'olive',
        badge: 0,
        name: '通知'
      }, {
        icon: 'loading2',
        color: 'blue',
        badge: 0,
        name: '开发中'
      }, {
        icon: 'loading2',
        color: 'purple',
        badge: 0,
        name: '开发中'
      }, {
        icon: 'questionfill',
        color: 'mauve',
        badge: 0,
        name: '帮助'
      }, {
        icon: 'commandfill',
        color: 'purple',
        badge: 0,
        name: '问答'
      }, {
        icon: 'loading2',
        color: 'mauve',
        badge: 0,
        name: '开发中'
      }],
  },
  methods: {
    onLoad: function () {
      this.setData({
        setting: app.globalData.setting
      })
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            wx.redirectTo({
              url: '/pages/auth/auth',
            })
          }
        }
      })
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res,
            hasUserInfo: true
          })
        }
      }
      // else {
      //   // 在没有 open-type=getUserInfo 版本的兼容处理
      //   wx.getUserInfo({
      //     success: res => {
      //       app.globalData.userInfo = res.userInfo
      //       this.setData({
      //         userInfo: res.userInfo,
      //         hasUserInfo: true
      //       })
      //     }
      //   })
      // }
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
    naviTo(e) {
      if (!e.currentTarget.dataset.path) {
        return
      }
      if (e.currentTarget.dataset.path == "/pages/index/signin/signin") {
        this.setData({
          showLoadModal: true
        })

        let now = new Date()
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // let today = new Date(new Date().setHours(0, 0, 0, 0))
        let dur = now - today
        if (dur > app.globalData.signInStart && dur < app.globalData.signInEnd){
          wx.request({
            data: { openId: this.data.userInfo.openId, signTime: now.getTime() },
            method:"post",
            url: app.globalData.baseUrl + 'signin',
            success: res => {
              setTimeout(() => {
                this.setData({
                  showLoadModal: false
                })
              }, 1000)
            }
          })
        }else{
          let start=new Date(app.globalData.signInStart)
          let end = new Date(app.globalData.signInEnd)
          start.getHours() + ":" + start.getMinutes()
          setTimeout(() => {
            this.setData({
              showLoadModal: false,
              modalName:"Modal",
              basicModal: { title: "签到失败", message: "每天" + (start.getHours() - 8) + ":" + (start.getMinutes() < 10 ? "0"+start.getMinutes():start.getMinutes()) + "-" + (end.getHours()-8) + ":" + end.getMinutes() + "才可签到哦~"},
            })
          }, 1000)
        }

      } else {
        wx.navigateTo({
          url: e.currentTarget.dataset.path,
        })
      }
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})