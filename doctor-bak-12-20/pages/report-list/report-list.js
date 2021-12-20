const app = getApp();
var base = require("../../utils/base.js");
Page({

  data: {
    loading: false,
    reportList: null, //体检列表
  },

  onShow(options) {
    let that = this
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
    }
    base.getData(base.server + app.getReportList, data, false).then(res => {
      for (let i in res.data) {
        res.data[i].gradeCode = that.getGradeCode(res.data[i].gradeCode)
      }
      that.setData({
        reportList: res.data,
        loading: true
      })
    })
  },
  toReportDetail(e) { //去体检报告详情
    wx.navigateTo({
      url: '/pages/report-query/report-query?exId=' + e.currentTarget.dataset.exid,
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
})