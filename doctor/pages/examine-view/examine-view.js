const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {

  },
  onLoad() {
    this.onDialog();
  },
  onShow: function() {

  },
  onDialog() {
    Dialog.alert({
      selector: '#van-dialog',
      title: '温馨提示',
      message: '如需查看入校检查报告，选择“入校检查报告”，如需查看于眼科医院完成的眼部体检结果，选择“眼部体检报告”。',
    }).then(() => {
      // on close
    });
  },
  onNavigateTo: function (e) {
    if ('1' === e.currentTarget.dataset.idx) {
      wx.navigateTo({url: '/pages/index/index'});
    } else if ('2' === e.currentTarget.dataset.idx) {
      wx.navigateTo({url: '/pages/high-web-ex-v/high-web-ex-v'});
    } else if ('3' === e.currentTarget.dataset.idx) {
      wx.navigateTo({url: '/pages/high-web-we-v/high-web-we-v'});
    }
  }
})
