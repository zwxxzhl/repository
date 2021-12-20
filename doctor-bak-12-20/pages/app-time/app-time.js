const app = getApp();
var base = require("../../utils/base.js");
Page({


  data: {
    docName: "",
    timeList: null,
    timeIndex: 0,
    doctorId: null,
    scheduleInfo: [],
  },

  onLoad(options) {
    this.setData({
      doctorId: options.dId,
      docName: options.docName,
      patientId: options.patientId,
    })
    let dates = [];
    let datestr;
    let showStr;
    let myDate = new Date();
    myDate.setDate(myDate.getDate() + 1);
    for (var i = 0; i < 5; i++) {
      datestr = myDate.getFullYear() + '-' + ((Number(myDate.getMonth()) + 1) < 10 ? '0' + (Number(myDate.getMonth()) + 1) : Number(myDate.getMonth()) + 1) + "-" + (myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate());
      showStr = Number(myDate.getMonth()) + 1 + "月" + myDate.getDate() + "日";
      var day = myDate.getDay();
      var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
      dates.push({
        dayStr: datestr,
        showStr: showStr,
        weeks: weeks[day]
      });
      myDate.setTime(myDate.getTime() + 1000 * 60 * 60 * 24);
    }
    this.setData({
      timeList: dates
    })
    this.getDocInfo();
  },
  getDocInfo() { //获取排班信息
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      doctorId: that.data.doctorId, // 医生ID
      currentDate: that.data.timeList[that.data.timeIndex].dayStr
    }
    base.getData(base.server1 + app.getScheduleInfo, data, false).then(res => {
      that.setData({
        scheduleInfo: res.data,
        loading: true
      })
    })
  },
  swiperTime(e) { //切换时间
    this.setData({
      timeIndex: e.currentTarget.dataset.index
    })
    this.getDocInfo();
  },
  toApp(e) { //预约就诊
    let that = this;
    let day = that.data.timeList[that.data.timeIndex].dayStr + " " + that.data.timeList[that.data.timeIndex].weeks + " "
    wx.showModal({
      title: "预约就诊",
      content: "确定预约【" + that.data.docName + "】（" + day + e.target.dataset.item.sTime + "~" + e.target.dataset.item.eTime + "）就诊吗？",
      success: res => {
        if (res.confirm) {
          let data = {
            openid: wx.getStorageSync('openId'),
            timestamp: wx.getStorageSync('timestamp'),
            token: wx.getStorageSync('token'),
            patientId: that.data.patientId, // 病人ID
            doctorScheduleItemId: e.target.dataset.item.doctorScheduleItemId, // 排班ID
          }
          base.getData(base.server1 + app.appDoctor, data, false).then(res => {
            console.log(res)
            wx.showModal({
              title: "预约成功",
              content: "预约成功！是否返回到首页立马查看【我的预约】",
              success: res => {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 10,
                  })
                  return
                }
                that.getDocInfo();
              }
            })

          })
        }

      }
    })
  },
})