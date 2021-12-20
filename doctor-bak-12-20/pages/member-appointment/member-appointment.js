const app = getApp();
var base = require("../../utils/base.js");
Page({

  data: {
    appList: [],
  },

  onLoad(options) {
    this.getAppInfo();
  },
  getAppInfo() { //获取我的预约信息
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
    }
    base.getData(base.server1 + app.getMyAppInfo, data, false).then(res => {
      that.setData({
        appList: res.data.rows,
        loading: true
      })
    })
  },
  cancelApp(e) { //取消预约
    let that = this;
    wx.showModal({
      title: "取消预约",
      content: "确定取消【" + e.target.dataset.item.DoctorName + "】（" + e.target.dataset.item.AppointDate + " " + e.target.dataset.item.STime + "~" + e.target.dataset.item.ETime + "）的预约吗？",
      success: res => {
        if (res.confirm) {
          let data = {
            openid: wx.getStorageSync('openId'),
            timestamp: wx.getStorageSync('timestamp'),
            token: wx.getStorageSync('token'),
            appointmentId: e.target.dataset.item.AppointmentId, //预约ID
            status: -1
          }
          base.getData(base.server1 + app.cancelApp, data, false).then(res => {
            that.getAppInfo();
          })
        }
      }
    })
  },
})