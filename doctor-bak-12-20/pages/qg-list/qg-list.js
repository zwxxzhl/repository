const app = getApp();
var base = require("../../utils/base.js");
const util = require("../../utils/util.js");
Page({

  data: {
    loading: false,
    reportList: null, //体检列表
  },

  onShow(options) {
    this.getMemBindList();
  },
  getMemBindList() { //身份列表
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
    }
    base.postData(base.server + app.queryGuardianList, data, false).then(res => {
      let idList = res.data;
      if (idList.length == 0) {
        that.setData({
          loading: true
        })
        return
      }
      let idNumbers = '';
      for (let i = 0; i < idList.length; i++) {
        idNumbers = idNumbers + idList[i].idNumber + ','
      }
      idNumbers = idNumbers.substring(0, idNumbers.length - 1);
      let data = {
        openid: wx.getStorageSync('openId'),
        timestamp: wx.getStorageSync('timestamp'),
        token: wx.getStorageSync('token'),
        idNumbers: idNumbers
      }
      base.getData(base.server1 + app.dataQueryByIdNumber, data, false).then(res => {
        for (let i in res.data) {
          res.data[i].examinationDate = util.formatNumberToTime1(res.data[i].examinationDate)
        }
        that.setData({
          reportList: res.data,
          loading: true
        })
      })
    })
  },

  toReportDetail(e) { //去屈光档案详情
    wx.navigateTo({
      url: '/pages/qg-info/qg-info?exId=' + e.currentTarget.dataset.exid,
    })
  },
})