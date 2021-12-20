const app = getApp();
var base = require("../../utils/base.js");
import util from '../../utils/util.js';
import QRCode from '../../utils/weapp.qrcode.min.js';
Page({

  data: {
    loading: false,
    studentInfo: null, //体检记录和明细
    examineData: null, //学生信息
    refSchool8hospital: null, //医院信息
    qrcode_w: '',
    qrcodePop: false
    // sourceType 体检类别：0:视力筛查；1：幼儿园；2：中小学
  },

  onLoad(options) {
    // options.exId = 'a6e00cbd-c265-48e2-b02f-dce8702d0aaf'
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      id: options.exId //体检报告ID
    }
    base.getData(base.server + app.getReportInfo, data, false).then(res => { //获取
      res.data.studentInfo.gradeCode = that.getGradeCode(res.data.studentInfo.gradeCode)
      that.setData({
        studentInfo: res.data.studentInfo,
        examineData: res.data.examineData,
        refSchool8hospital: res.data.refSchool8hospital ? res.data.refSchool8hospital : null,
        loading: true
      })
      let W = wx.getSystemInfoSync().windowWidth;
      let rate = 750.0 / W;
      that.setData({
        qrcode_w: 130 / rate,
        qrcodePop: true
      })
      let birthDay = util.formatNumberToTime1(res.data.studentInfo.birthday);
      // 姓名,性别,出生日期,身份证号  拼在一起然后生成二维码
      let qrcodeText = `${res.data.studentInfo.idNumber}`
      QRCode({
        width: that.data.qrcode_w,
        height: that.data.qrcode_w,
        canvasId: 'myQrcode',
        text: qrcodeText,
      })
    })
  },
  getGradeCode(gradeCode) { //获取班级
    switch (gradeCode) {
      case 1:
        return "小班";
      case 2:
        return "中班";
      case 3:
        return "大班";
      case 11:
        return "一年级";
      case 12:
        return "二年级";
      case 13:
        return "三年级";
      case 14:
        return "四年级";
      case 15:
        return "五年级";
      case 16:
        return "六年级";
      case 21:
        return "初一";
      case 22:
        return "初二";
      case 23:
        return "初三";
      case 31:
        return "高一";
      case 32:
        return "高二";
      case 33:
        return "高三";
    }
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

  },
  preImg(e) {
    let that = this;
    let img = base.server + e.currentTarget.dataset.img;
    wx.previewImage({
      urls: [img],
      current: img
    })
  }
})