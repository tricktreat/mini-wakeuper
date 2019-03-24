const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    aboutUs:{},
    setting: app.globalData.setting
  },
  onLoad: function () { 
    this.setData({
      setting: app.globalData.setting,
    }),
    wx.request({
      url: app.globalData.baseUrl+'aboutus',
      success:res=>{
        let _aboutus={title:"",paras:[]}
        for (let item of res.data.data){
          if(item.type=="title"){
            _aboutus["title"] = item.content
          }
          if (item.type == "para") {
            _aboutus["paras"].push(item)
          }
        }
       
        this.setData({
          aboutUs: _aboutus,
        })
      }
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});