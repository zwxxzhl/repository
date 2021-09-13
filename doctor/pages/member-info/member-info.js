const app = getApp();
var base = require("../../utils/base.js");
var util = require("../../utils/util.js");
Page({

  data: {
    memInfo: null,
    loading: false,
    sex: ['男', '女'],
  },

  onLoad(options) {
    this.getMemInfo();
  },
  add0(m) {
    return m < 10 ? '0' + m : m
  },
  getMemInfo() { //获取个人资料
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
    }
    base.postData(base.server + app.getInfo, data, false).then(res => {
      res.data.birthday = util.formatNumberToTime(res.data.birthday);
      that.setData({
        memInfo: res.data,
        loading: true
      })
    })
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
  inputIdCard(e) { //输入身份证号
    let that = this;
    let memInfo = that.data.memInfo;
    memInfo.idCardNo = e.detail.value ? e.detail.value : '';
    that.setData({
      memInfo: memInfo
    })
  },
  saveInfo() { //保存个人资料
    let that = this;
    let memInfo = that.data.memInfo;
    if (!memInfo.userName) {
      base.showToast('请输入姓名', 1500, false);
      return
    }
    if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(memInfo.mobilePhone))) {
      base.showToast('请输入正确的手机号码', 1500, false);
      return
    }
    if (memInfo.idCardNo) {
      // if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(memInfo.idCardNo))) {
      if (memInfo.idCardNo.length < 18) {
        base.showToast('请输入正确的身份证号', 1500, false);
        return
      }
    }
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      action: 'update',
      userId: that.data.memInfo.userId,
      userName: that.data.memInfo.userName,
      gendor: that.data.memInfo.gendor,
      mobilePhone: that.data.memInfo.mobilePhone,
      birthday: util.formatNumberToTime1((new Date(that.data.memInfo.birthday)).getTime()),
      idCardNo: that.data.memInfo.idCardNo
    }
    base.postData(base.server + app.setInfo, data, false).then(res => {
      base.showToast('保存成功', 1500, false);
      res.data.birthday = util.formatNumberToTime(res.data.birthday);
      that.setData({
        memInfo: res.data
      })
    })
  },
})