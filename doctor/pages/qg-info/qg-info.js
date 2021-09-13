const app = getApp();
var base = require("../../utils/base.js");
import util from '../../utils/util.js';
import QRCode from '../../utils/weapp.qrcode.min.js';
Page({

  data: {
    loading: false,
    examineData: null, //信息
    qrcode_w: '',
    qrcodePop: false,
    itemss: null,
    // sourceType 体检类别：0:视力筛查；1：幼儿园；2：中小学
  },

  onLoad(options) {
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      sheetId: options.exId //体检报告ID
    }
    base.postData(base.server1 + app.getDataBySheetId, data, false).then(res => { //获取
      that.setData({
        examineData: res.data,
        loading: true
      })
      let W = wx.getSystemInfoSync().windowWidth;
      let rate = 750.0 / W;
      that.setData({
        qrcode_w: 130 / rate,
        qrcodePop: true
      })
      // 姓名,性别,出生日期,身份证号  拼在一起然后生成二维码
      let qrcodeText = `${that.data.examineData.idNumber}`
      QRCode({
        width: that.data.qrcode_w,
        height: that.data.qrcode_w,
        canvasId: 'myQrcode',
        text: qrcodeText,
      })
      that.initData();
    })
  },
  initData() { //数据
    let that = this;
    let items = {};
    let oldItems = that.data.examineData.items;
    if (oldItems && oldItems.length > 0) {
      oldItems = oldItems[0].examineResultList;
      if (oldItems && oldItems.length > 0) {
        for (let i = 0; i < oldItems.length; i++) {
          var key = oldItems[i].indexCode;
          var value = oldItems[i];
          items[key] = value;
        }
      }
    }
    that.setData({
      itemss: items,
    })
  },
  toChooseDoctor() { //去预约挂号
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      hospId: that.data.refSchool8hospital.hospId, //医院id
      patientName: that.data.studentInfo.studentName, //学生姓名
      gendor: that.data.studentInfo.gender, // 性别
      birthday: util.formatNumberToTime1(that.data.studentInfo.birthday), // 出生日期
      mobilePhone: '', // 手机号码
    }
    base.postData(base.server1 + app.patientInfo, data, false).then(res => {
      wx.navigateTo({
        url: '/pages/app-doctor/app-doctor?checkHospitalId=' + this.data.refSchool8hospital.checkHospitalId + "&patientId=" + res.data.patientId,
      })
    })
  }
})