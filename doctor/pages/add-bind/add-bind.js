const app = getApp();
var base = require("../../utils/base.js");
Page({

  data: {
    relationList: ['本人', '父子', '父女', '母子', '母女', '其他'],
    patientName: "", //学生姓名
    idNumber: "", //身份证号
    relation: '', //关系
    // 352227201303040586
  },


  onLoad(options) {

  },
  inputName(e) { //输入姓名
    this.setData({
      patientName: e.detail.value
    })
  },
  inputIdCard(e) { //输入身份证号
    this.setData({
      idNumber: e.detail.value
    })
  },
  chooseGx() { //选择关系
    let that = this;
    wx.showActionSheet({
      itemList: that.data.relationList,
      success: res => {
        that.setData({
          relation: that.data.relationList[res.tapIndex],
        })
      }
    })
  },
  addBind() { //添加绑定
    let that = this;
    if (!that.data.patientName) {
      base.showToast('请输入姓名', 1500, false);
      return
    }
    // if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.data.idNumber))) {
    if (that.data.idNumber.length < 18) {
      base.showToast('请输入正确的身份证号', 1500, false);
      return
    }
    if (!that.data.relation) {
      base.showToast('请选择关系', 1500, false);
      return
    }
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      patientName: that.data.patientName, //学生姓名
      idNumber: that.data.idNumber, //身份证号
      relation: that.data.relation, //关系
    }
    base.postData(base.server + app.addGuardian, data, false).then(res => {
      wx.showModal({
        content: '添加成功',
        showCancel: false,
        success: res => {
          if (res.confirm) {
            wx.navigateBack({})
          }
        }
      })
    })

  },
})