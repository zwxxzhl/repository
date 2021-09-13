const app = getApp();
var base = require("../../utils/base.js");
import util from '../../utils/util.js';
import QRCode from '../../utils/weapp.qrcode.min.js';

var AppId = 'wxdd9053e502bb8b9e';
var AppSecret = '0b1b4be6f4ec6ee02b189d85ce96fa38';

Page({
  data: {
    loading: false,
    userInfo: null,
    qrcode_w: '',
    qrcodePop: false,
  },
  onLoad() {},

  onShow() {
    let openId = wx.getStorageSync('openId');
    if (!openId) {
      app.userLogin();
      return
    }
    let that = this;
    let data = {
      openid: openId
    }
    base.getData(base.server + app.getInfo, data, that.data.loading).then(res => {
      that.setData({
        userInfo: res.data,
        loading: true
      })
    })
  },
  toAppointment() { //去我的预约
    wx.navigateTo({
      url: '/pages/member-appointment/member-appointment',
    })
  },
  toReport() { //体检报告
    wx.navigateTo({
      url: '/pages/report-list/report-list',
    })
  },
  toQgReport() { //屈光档案
    wx.navigateTo({
      url: '/pages/qg-list/qg-list',
    })
  },
  toMemberInfo(e) { //去个人资料
    wx.navigateTo({
      url: '/pages/member-info/member-info',
    })
  },
  toBind() { //身份绑定
    wx.navigateTo({
      url: '/pages/member-bind/member-bind',
    })
  },
  toQrcode() { //二维码生成
    wx.navigateTo({
      url: '/pages/create-qrcode/create-qrcode',
    })
  }
})
