const app = getApp();
var base = require("../../utils/base.js");
Page({

  data: {
    memBindList: [],
    loading: false,
  },

  onShow() {
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
      that.setData({
        memBindList: res.data,
        loading: true
      })
    })
  },
  toAddBind() { //添加绑定
    wx.navigateTo({
      url: '/pages/add-bind/add-bind',
    })
  },
  deleteBind(e) { //删除绑定
    let that = this;
    wx.showModal({
      title: "删除",
      content: "确认删除该身份绑定吗？",
      success: res => {
        if (res.confirm) {
          let data = {
            openid: wx.getStorageSync('openId'),
            timestamp: wx.getStorageSync('timestamp'),
            token: wx.getStorageSync('token'),
            studentGuardianId: e.currentTarget.dataset.sgid
          }
          base.postData(base.server + app.deleteGuardian, data, false).then(res => {
            wx.showModal({
              content: '删除成功',
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  that.getMemBindList();
                }
              }
            })
          })
        }
      }
    })

  },
})