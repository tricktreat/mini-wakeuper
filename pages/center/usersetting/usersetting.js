const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    setting: app.globalData.setting,
    userInfo: app.globalData.userInfo,
    campus: null,
    master: null,
    department: null,
    birthday: null,
    motto: null,
    phoneNumber: null,
    studentId:null,
    name:null,
    tag:null,
    campusPicker: ['天赐庄', '独墅湖', '阳澄湖'],
    masterPicker: {
      '文学院': ['中国语言文学类', '汉语言文学(师范)', '汉语言文学(基地)', '汉语国际教育', '秘书学'],
      '材料与化学化工学部': ['化学类', '化学', '应用化学', '化学工程与工艺', '材料科学与工程', '无机非金属材料工程', '高分子材料与工程', '材料化学', '材料类', '功能材料'],
      '传媒学院': ['新闻传播学类', '新闻学', '广告学', '播音与主持艺术', '广播电视学', '网络与新媒体'],
      '纳米科学技术学院': ['纳米材料与技术'],
      '社会学院': ['历史学(师范)', '社会学', '档案学', '旅游管理', '社会工作', '劳动与社会保障', '信息资源管理', '图书情报与档案管理类', '社会学类'],
      '计算机科学与技术学院': ['计算机科学与技术', '信息管理与信息系统', '网络工程', '软件工程', '物联网工程', '计算机类'],
      '政治与公共管理学院': ['哲学', '行政管理', '公共事业管理', '管理科学', '人力资源管理', '思想政治教育', '城市管理', '物流管理', '物流管理与工程类(中外合作办学)(物流管理)'],
      '电子信息学院': ['通信工程', '电子信息工程', '电子科学与技术', '信息工程', '微电子科学与工程', '集成电路设计与集成系统', '电子信息类'],
      '教育学院': ['教育学(师范)', '应用心理学'],
      '机电工程学院': ['机械类', '机械电子工程', '材料成型及控制工程', '工业工程', '电气工程及其自动化', '机械工程'],
      '东吴商学院': ['经济学', '国际经济与贸易', '财政学', '金融学', '会计学', '工商管理', '财务管理', '电子商务', '金融学类(中外合作办学)(金融学)'],
      '沙钢钢铁学院': ['冶金工程', '金属材料工程'],
      '王健法学院': ['法学', '知识产权'],
      '纺织与服装工程学院': ['轻化工程', '纺织工程', '服装设计与工程', '非织造材料与工程', '纺织类(中外合作办学)(纺织工程)', '纺织类'],
      '外国语学院': ['英语', '英语(师范)', '日语', '朝鲜语', '德语', '西班牙语', '翻译', '俄语', '法语'],
      '轨道交通学院': ['车辆工程', '交通运输', '建筑环境与能源应用工程', '电气工程与智能控制', '轨道交通信号与控制'],
      '金螳螂建筑学院': ['建筑学', '城乡规划', '风景园林', '历史建筑保护工程'],
      '体育学院': ['体育教育', '运动训练', '武术与民族传统体育', '运动康复'],
      '数学科学学院': ['数学类', '数学与应用数学(基地)', '数学与应用数学(师范)', '信息与计算科学', '统计学', '金融数学'],
      '艺术学院': ['艺术设计学', '视觉传达设计', '环境设计', '产品设计', '服装与服饰设计', '美术学(师范)', '美术学', '数字媒体艺术'],
      '物理科学与技术学院': ['物理学', '物理学(师范)'],
      '音乐学院': ['音乐表演', '音乐学(师范)'],
      '光电科学与工程学院': ['电子信息科学与技术', '测控技术与仪器', '光电信息科学与工程'],
      '医学部': ['口腔医学', '医学影像学', '法医学', '临床医学', '临床医学(儿科医学)', '放射医学', '预防医学', '药学', '中药学', '生物技术', '生物科学', '生物信息学', '生物科学类', '护理学', '食品质量与安全', '生物制药', '医学检验技术', '临床医学(5+3一体化)', '临床医学(5+3一体化,儿科医学)'],
      '能源学院': ['新能源材料与器件', '能源与动力工程', '材料类(中外合作办学)(新能源材料与器件)']
    },
    multiArray: [
      ['文学院', '材料与化学化工学部', '传媒学院', '纳米科学技术学院', '社会学院', '计算机科学与技术学院', '政治与公共管理学院', '电子信息学院', '教育学院', '机电工程学院', '东吴商学院', '沙钢钢铁学院', '王健法学院', '纺织与服装工程学院', '外国语学院', '轨道交通学院', '金螳螂建筑学院', '体育学院', '数学科学学院', '艺术学院', '物理科学与技术学院', '音乐学院', '光电科学与工程学院', '医学部', '能源学院'],
      ['中国语言文学类', '汉语言文学(师范)', '汉语言文学(基地)', '汉语国际教育', '秘书学']
    ]
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      setting: app.globalData.setting,
      campus: app.globalData.userInfo.campus,
      master: app.globalData.userInfo.master,
      department: app.globalData.userInfo.department,
      birthday: app.globalData.userInfo.birthday,
      motto: app.globalData.userInfo.motto,
      phoneNumber: app.globalData.userInfo.phoneNumber,
      studentId: app.globalData.userInfo.studentId,
      name: app.globalData.userInfo.name,
      tag: app.globalData.userInfo.tags.join(' ')
    })
  },
  pickerChange(e) {
    // console.log(e)
    let type = e.target.dataset.type
    let data = {}
    let container = e.target.dataset.container
    if (container) {
      data[type] = this.data[container][e.detail.value]
    } else {
      data[type] = e.detail.value
    }
    this.setData(data)
  },
  setInput(e) {
    let type = e.target.dataset.type
    let data = {}
    if (e.detail.value){
      data[type] = e.detail.value
      this.setData(data)
    }
  },
  multiChange(e) {
    this.setData({
      department: this.data.multiArray[0][e.detail.value[0]],
      master: this.data.multiArray[1][e.detail.value[1]]
    })
  },
  multiColumnChange(e) {
    if (e.detail.column == 0) {
      let _multiArray = this.data.multiArray
      _multiArray[1] = this.data.masterPicker[_multiArray[0][e.detail.value]]
      this.setData({
        multiArray: _multiArray
      })
    }
  },
  formSubmit(e) {
    let data = {
      openId: app.globalData.userInfo.openId,
      campus: this.data.campus,
      master: this.data.master,
      department: this.data.department,
      birthday: this.data.birthday+"GMT+8",//new Date的参数如果不指定时区默认为GMT+0时间
      motto: this.data.motto,
      phoneNumber: this.data.phoneNumber,
      studentId: this.data.studentId,
      name: this.data.name,
      tag: this.data.tag.split(' ').join(";")
    }
    Object.assign(app.globalData.userInfo, data)
    app.globalData.userInfo.tags = this.data.tag.split(' ')
    delete app.globalData.userInfo.tag
    wx.request({
      method: "POST",
      url: app.globalData.baseUrl + 'userinfo/updateuser',
      data:  data,
      success: res => {
        this.setData({
          modalName: "Modal",
          basicModal: { title: "保存成功", message: "个人信息已更新~" },
        })
      }
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
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});