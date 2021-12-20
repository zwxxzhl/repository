// const server = "http://www.tfhealth.net/sh/";
// const server =  "https://www.scinomedicine.com/student_health";
const server = "https://sh.eyescare.cn/sh/";
const server1 = "https://ec.eyescare.cn/"

// const server =  "https://student.scinomedicine.com/student_health/";
// https://mbsb.scinomedicine.com/student_health/api/user/get.do?openid=9906e4ba-fd48-42ad-b4da-61cc461bbecc
const ok = 0; //服务端接口返回的错误码，0表示成功，其它表示有异常。
// https://mbsb.scinomedicine.com/student_health/api/user/getOpenIdByCode.do?code=023D990w3oXVmW2xTr0w3kmPsa3D990q
// https://student.scinomedicine.com/student_health/api/user/getOpenIdByCode.do


/**
 * 轻提示
 * msg 提示内容
 * flag 是否遮罩
 */
const showToast = (msg, time, flag) => {
  wx.showToast({
    title: msg,
    icon: "none",
    duration: time,
    mask: flag
  });
}

/**
 * post 请求
 * url 接口地址
 * data 参数
 * showLoading 显示加载动画 默认显示 传true关闭
 */
const postData = (url, data, showLoading) => {
  var that = this;
  if (!showLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
  }
  return new Promise((reslove, reject) => {
    wx.request({
      url: url,
      data: data,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Cookie": wx.getStorageSync("session")
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code == ok) { //接口正常返回
          reslove(res.data);
          return;
        }
        wx.showToast({
          title: res.data.data,
          icon: 'none',
          mask: true,
          duration: 1500
        });
      },
      fail: res => {
        wx.showToast({
          title: '请求超时！',
          icon: 'none',
          mask: true,
          duration: 1500
        });
      }
    })
  })
}

/**
 * get请求
 * url 接口地址
 * data 参数
 * showLoading 显示加载动画 默认显示 传true关闭
 */
const getData = (url, data, showLoading) => {
  var promise = new Promise((resolve, reject) => {
    if (!showLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true,
      })
    }
    wx.request({
      url: url,
      data: data,
      method: "GET",
      header: {
        "Cookie": wx.getStorageSync("session")
      },
      success: res => { //服务器返回数据
        wx.hideLoading();
        if (res.data.code == ok) {
          resolve(res.data);
          return;
        }
        wx.showToast({
          title: res.data.data,
          icon: 'none',
          mask: true,
          duration: 1500
        });
      },
      fail: res => {
        wx.showToast({
          title: '请求超时！',
          icon: 'none',
          mask: true,
          duration: 1500
        });
      },
      error: e => {
        reject('网络出错！');
      },
    })
  });
  return promise;
}


module.exports = {
  server: server,
  server1: server1,
  showToast: showToast,
  getData: getData,
  postData: postData,
}
