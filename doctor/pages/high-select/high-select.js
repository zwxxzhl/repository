const app = getApp()

Page({
  data: {

  },
  onLoad() {

  },
  onShow: function() {

  },
  onNavigateTo: function (e) {
    if ('1' === e.currentTarget.dataset.idx) {
      wx.navigateTo({url: '/pages/high-web-ex-v/high-web-ex-v'});
    }
  }
})
