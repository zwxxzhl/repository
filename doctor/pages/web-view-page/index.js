const app = getApp()

Page({
  data: {
    srcUrl: ''
  },
  onLoad(options) {
    if (options.srcUrl) {
      this.setData({
        srcUrl: options.srcUrl
      });
    }
  },
  onShow: function () {

  }
})
