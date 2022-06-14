Component({

  properties: {},
  data: {},
  methods: {
    onClick(e) {
      let val = parseInt(e.target.dataset.id);
      let url = ""
      if (1 === val) {
        url = "https://mp.weixin.qq.com/s/TAA0oDgN3g-Qx3j-FGzYxw";
      } else if (2 === val) {
        url = "https://mp.weixin.qq.com/s/0w0Ip3SQ2gXW8XeiaPLBsg";
      } else if (3 === val) {
        url = "https://mp.weixin.qq.com/s/zDNOJ34TIm0eA_DZjnu4YQ";
      } else if (4 === val) {
        url = "https://mp.weixin.qq.com/s/I9c0UTbD3KrfvbNgtIWOmA";
      } else if (5 === val) {
        url = "https://mp.weixin.qq.com/s/oYRNxFw4iFP6FQ4m_5m7kg";
      } else if (6 === val) {
        url = "https://mp.weixin.qq.com/s/467srw1GSWX6ZJZ4ARxp5g";
      } else if (7 === val) {
        url = "https://mp.weixin.qq.com/s/UiZvUxl8-QivW97KLykvAg";
      } else if (8 === val) {
        url = "https://mp.weixin.qq.com/s/vMQlqcBwyKh372fx1xOigw";
      } else if (9 === val) {
        url = "https://mp.weixin.qq.com/s/o-oKnl4zRz5-tMCcd7KlSA";
      } else if (10 === val) {
        url = "https://mp.weixin.qq.com/s/wAFmn2qmhssZCemqrT1jlQ";
      } else if (11 === val) {
        url = "https://mp.weixin.qq.com/s/ybtzzDMgVWic-lgQVZJ9Rg";
      } else if (12 === val) {
        url = "https://mp.weixin.qq.com/s/COEguv_qsX9qpH43IVtF-w";
      } else if (13 === val) {
        url = "https://mp.weixin.qq.com/s/mDj56JW73A_57eyErWZY-Q";
      } else if (14 === val) {
        url = "https://mp.weixin.qq.com/s/ymJE_rfAC6krITj21KdRdQ";
      }
      else {
        return;
      }

      wx.navigateTo({ url: "/pages/web-view-page/index?srcUrl=" +url});
    }
  }

})

