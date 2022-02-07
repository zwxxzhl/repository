const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {

  },
  onLoad() {

  },
  onShow: function() {

  },
  onTuanTiDialog(e) {
    Dialog.alert({
      selector: '#tuan-ti-dialog',
      title: '温馨提示',
      message: '本项目仅向供电局职工开放，如需要安排团队眼部体检工作，请联系我们进行下一步确认。',
    }).then(() => {
      this.onNavigateTo(e)
    });
  },
  onNavigateTo: function (e) {
    if ('1' === e.currentTarget.dataset.idx) {
      wx.navigateTo({url: '/pages/high-web-we/high-web-we'});
    }
  }
})
