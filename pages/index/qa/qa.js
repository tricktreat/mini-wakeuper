const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    setting: app.globalData.setting,
    keyboard:0,
    moreShow: 0,
    moreShowIndex: 0,
    lastChatOrder: 8,
    candidates_list: [],
    scores_list: [],
    input: '',
    chatList: [
      {
        "order": 1,
        "fromWho": "system",
        "content": "开始和我聊天吧",
        "status": "success"
      }
    ]
  },
  onLoad: function (options) {
    this.computeScrollViewHeight()
    // this.addChat("you", "哈喽～问我一一些医疗相关的问题吧，例如：“糖尿病有哪些症状？”", "invalid")
    this.addChat("you", "个人毕设项目~《基于深度学习和文本匹配的医疗问答系统》，暂时不能使用。", "invalid")

    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/auth/auth',
          })
        } else {
          if (app.globalData.userInfo) {
            this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
          } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          } else {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
              }
            })
          }
        }
      }
    })
  },
  sendChat(e) {
    if (this.data.input == "") {
      this.addSysInfo("输入问题再发送哦～", "fail")
      return
    }
    this.addChat('me', this.data.input)
    this.replay(this.data.input)
    this.setData({
      input: '',
    })
  },
  replay(e) {
    wx.request({
      url: app.globalData.baseUrl + 'qa',
      data: { 'question': e, 'topk': 30 },
      method: "post",
      fail:res=>{
        
      },
      success: res => {
        if (res.statusCode!=200){
          this.addSysInfo('浙大内网，暂不支持问答服务', 'fail')
          return
        }
        let data = res['data']
        if (data['success'] == 0) {
          this.addChat('you', "抱歉，这个问题我暂时还不能解答～", "invalid")
        } else {
          this.addChat('you', data['bestanswer'])
          this.addSysInfo('可信度' + data['bestscore'], 'success')
          this.addAllAnswer(data['candidates'], data['scores'])
        }
      }
    })
  },
  addAllAnswer: function (candidates, scores) {
    let _candidates_list = this.data.candidates_list
    let _scores_list = this.data.scores_list
    _candidates_list.push(candidates)
    _scores_list.push(scores)
    this.setData({
      candidates_list: _candidates_list,
      scores_list: _scores_list
    })
  },
  sendSysInfo(e) {
    console.log(e)
  },
  addSysInfo(content, status) {
    let chat = {}
    chat['fromWho'] = 'system'
    chat['order'] = this.data.chatList.slice(-1)[0].order + 1
    chat['status'] = status
    chat['content'] = content
    var _chalist = this.data.chatList
    _chalist.push(chat)
    this.setData({
      chatList: _chalist,
      lastChatOrder: chat.order,
    })
  },
  addChat(from, content, tag = 'valid') {
    let chat = {}
    chat['tag'] = tag
    let headerUrl = from == 'me' ? this.data.userInfo.avatarUrl : 'https://image.weilanwl.com/img/square-2.jpg'
    chat['headerUrl'] = headerUrl
    chat['content'] = content
    chat['fromWho'] = from
    chat['createTime'] = new Date().pattern("yyyy年MM月dd日 hh:mm:ss")
    chat['order'] = this.data.chatList.slice(-1)[0].order + 1
    var _chalist = this.data.chatList
    _chalist.push(chat)
    this.setData({
      chatList: _chalist,
      lastChatOrder: chat.order,
    })
  },
  onInput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  inputFocus(e) {
    this.setData({
      keyboard: e.detail.height
    })
  },
  inputBlur(e){
    this.setData({
      keyboard: 0
    })
  },
  computeScrollViewHeight() {
    let that = this
    let query = wx.createSelectorQuery().in(this)
    query.select('.cu-custom').boundingClientRect()
    query.select('.cu-bar.foot.input').boundingClientRect()
    query.exec(function (res) {
      //得到标题和底部的高度
      let custom = res[0].height
      let bar = res[1].height
      //获取屏幕可用高度
      let windowHeight = wx.getSystemInfoSync().windowHeight
      //计算 scroll-view 的高度
      let scrollHeight = windowHeight - bar - custom
      let order = that.data.chatList.slice(-1)[0].order
      that.setData({
        scrollHeight: scrollHeight,
        lastChatOrder: order
      })
    })
  },
  hideMore: function (e) {
    this.setData({
      moreShow: 0,
    })
  },
  showMore: function (e) {
    let t = e.currentTarget.dataset.target
    let index = 0
    for (let i = 0; i < t; i++) {
      if (this.data.chatList[i].fromWho == "you" && this.data.chatList[i].tag == 'valid') {
        index++
      }
    }
    this.setData({
      moreShow: 1,
      moreShowIndex: index
    })
  },
  onShow: function () {
    this.setData({
      lastChatOrder: this.data.chatList.slice(-1)[0].order
    })
  },
  onShareAppMessage() {
    return {
      title: '一起加入WakeUp俱乐部吧~',
      imageUrl: 'https://blog.ibilidi.cn/images/welcome.jpg',
      path: 'pages/index/index/index'
    }
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});