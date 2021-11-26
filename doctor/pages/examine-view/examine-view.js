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
      wx.navigateTo({url: '/pages/index/index'});
    } else if ('2' === e.currentTarget.dataset.idx) {

    } else if ('3' === e.currentTarget.dataset.idx) {
      wx.navigateTo({url: '/pages/high-web-we-v/high-web-we-v'});
    }
  }
})
