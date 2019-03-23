const app=getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    setting: app.globalData.setting,
    list: [
      {
        "pagePath": "/pages/index/index/index",
        "iconPath": "crown",
        "selectedIconPath": "crownfill",
        "text": "在这里"
      },
      {
        "pagePath": "/pages/circle/circle/circle",
        "iconPath": "discover",
        "selectedIconPath": "discoverfill",
        "text": "圈子"
      },
      {
        "pagePath": "/pages/center/center/center",
        "iconPath": "favor",
        "selectedIconPath": "favorfill",
        "text": "中心"
      }
    ]
    // list: [
    //   {
    //     "pagePath": "/pages/index/index/index",
    //     "iconPath": "/images/tabbar/basics.png",
    //     "selectedIconPath": "/images/tabbar/basics_cur.png",
    //     "text": "在这里"
    //   },
    //   {
    //     "pagePath": "/pages/circle/circle/circle",
    //     "iconPath": "/images/tabbar/component.png",
    //     "selectedIconPath": "/images/tabbar/component_cur.png",
    //     "text": "圈子"
    //   },
    //   {
    //     "pagePath": "/pages/center/center/center",
    //     "iconPath": "/images/tabbar/plugin.png",
    //     "selectedIconPath": "/images/tabbar/plugin_cur.png",
    //     "text": "中心"
    //   }
    // ]
  },
  methods: {
    switchTab(e) {      
      const url = e.currentTarget.dataset.path
      wx.switchTab({
        url
      })
    }
  },

  pageLifetimes: {}
})