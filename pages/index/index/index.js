//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    swiperList: [],
    userInfo: {},
    setting: {},
    showLoadModal: 0,
    modalName: null,
    loadingModal: { message: "请稍后..." },
    imageModal: { imgurl: "https://blog.ibilidi.cn/images/birthday.jpg", confirm: "谢谢你~" },
    basicModal: { title: "Modal标题", message: "Modal内容" },
    today: "99-99",
    birthday: "00-00",
    // hasUserInfo: false, https://albedo-theme.com/wp-content/uploads/2016/08/pexels-photo-26180.jpg
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
        icon: 'peoplefill',
        color: 'blue',
        badge: 0,
        name: '社团成员',
        path: "/pages/index/member/member"
      }, {
        icon: 'loading2',
        color: 'purple',
        badge: 0,
        name: '开发中'
      }, {
        icon: 'loading2',//'questionfill',
        color: 'mauve',
        badge: 0,
        name: '开发中',//'帮助'
      }, {
        icon: 'loading2',//'commandfill',
        color: 'purple',
        badge: 0,
        name: '开发中',//'问答'
      }, {
        icon: 'loading2',
        color: 'mauve',
        badge: 0,
        name: '开发中'
      }],
  },
  methods: {
    onLoad: function () {
      let now = new Date()
      let month = now.getMonth() + 1
      let date = now.getDate()
      this.setData({
        setting: app.globalData.setting,
        today: (month > 9 ? month.toString() : '0' + month.toString()) + "-" + (date > 9 ? date.toString() : '0' + date.toString())
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
          birthday: app.globalData.userInfo.birthday.slice(5, 7) + "-" + app.globalData.userInfo.birthday.slice(8, 10),
          hasUserInfo: true
        })
      } else {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res,
            birthday: res.birthday.slice(5, 7) + "-" + res.birthday.slice(8, 10),
            hasUserInfo: true
          })
        }
      }
      wx.request({
        url: app.globalData.baseUrl + 'swiperimage',
        success: res => {
          this.setData({
            swiperList: res.data.data
          })
        }
      })
      //设置是否展示生日祝福的缓存过期
      let expiration = wx.getStorageSync("expiration")
      if (!expiration || expiration < Date.parse(now)) {
        this.setData({
          showBirthday: true
        })
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
        modalName: e.currentTarget.dataset.target,

      })
    },
    hideModal(e) {
      this.setData({
        modalName: null,
      })
    },
    //设置是否展示生日祝福的缓存过期
    hideBirthdayModal(e) {
      let now = Date.parse(new Date())
      let expiration = now + 3600 * 1000 * 24
      wx.setStorage({
        key: 'expiration',
        data: expiration,
      })
      this.setData({
        showBirthday: false
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
        if (this.data.userInfo.signinfos.length > 0) {
          setTimeout(() => {
            this.setData({
              showLoadModal: false,
              modalName: "Modal",
              basicModal: { title: "签到失败", message: "今天已经签过到了哦~" },
            })
          }, 1000)
          return
        }
        let now = new Date()
        // console.log(now)
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // console.log(today)

        // let today = new Date(new Date().setHours(0, 0, 0, 0))
        let dur = now - today
        if (dur > app.globalData.signInStart && dur < app.globalData.signInEnd) {
          wx.request({
            data: { openId: this.data.userInfo.openId, signTime: now.toUTCString() },
            method: "post",
            url: app.globalData.baseUrl + 'signin',
            success: res => {
              app.refreshUserInfo({ openId: this.data.userInfo.openId }, this)
              setTimeout(() => {
                this.setData({
                  showLoadModal: false,
                  modalName: "Modal",
                  basicModal: { title: "签到成功", message: "继续加油哦~" },
                })
              }, 1000)
            }
          })
        } else {
          let end = new Date(app.globalData.signInEnd)
          let start = new Date(app.globalData.signInStart)
          setTimeout(() => {
            this.setData({
              showLoadModal: false,
              modalName: "Modal",
              basicModal: { title: "签到失败", message: "每天" + start.toUTCString().slice(-12, -7) + "-" + end.toUTCString().slice(-12, -7) + "才可签到哦~" },
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
          selected: 0,
          setting: app.globalData.setting
        })
      }
    }
  }
})