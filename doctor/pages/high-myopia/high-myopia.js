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
      message: '欢迎使用穗视康小程序，高度近视检查预约请选择“高度近视”，近视防控宣讲请选择“宣教预约”，' +
          '供电局/其他团体体检项目请选择“团体体检预约”，如需要查看视力筛查结果、各项目检查结果，请选择“报告查看”。',
    }).then(() => {
      // on close
    });
  },
  onXuanJiaoDialog() {
    Dialog.alert({
      selector: '#xuan-jiao-dialog',
      title: '温馨提示',
      message: '近视防控宣教面向全广州市中小学免费开放，我们将根据需要安排中山眼科中心眼科专家进行入校科普宣教工作。请确认好大致时间，' +
          '并向您学校的校医/卫生主管老师确认验证码进行预约。因工作安排，预约需提前一周进行。',
    }).then(() => {
      wx.navigateTo({url: '/pages/high-web-pe/high-web-pe'});
    });
  }
})
