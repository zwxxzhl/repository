Page({

  data: {
    memInfo: {
      birthday: "2021/03/13"
    },
  },

  onLoad(options) {

  },
  inputName(e) { //输入姓名
    let that = this;
    let memInfo = that.data.memInfo;
    memInfo.userName = e.detail.value;
    that.setData({
      memInfo: memInfo
    })
  },
  chooseSex() { //选择性别
    let that = this;
    let memInfo = that.data.memInfo;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: res => {
        memInfo.gendor = res.tapIndex;
        that.setData({
          memInfo: memInfo
        })
      }
    })
  },
  inputPhone(e) { //输入手机号
    let that = this;
    let memInfo = that.data.memInfo;
    memInfo.mobilePhone = e.detail.value;
    that.setData({
      memInfo: memInfo
    })
  },
  chooseBirthday(e) { //选择出生日期
    let that = this;
    let memInfo = that.data.memInfo;
    memInfo.birthday = e.detail.value.replace(/-/g, "/");
    that.setData({
      memInfo: memInfo
    })
  },
})