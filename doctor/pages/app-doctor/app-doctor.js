const app = getApp();
var base = require("../../utils/base.js");
Page({

  data: {
    checkHospitalId: null,
    patientId: null, //病人id
    doctor: [],
    loading: false,
  },

  onLoad(options) {
    this.setData({
      checkHospitalId: options.checkHospitalId,
      patientId: options.patientId,
    })
    this.getDepInfo();
  },
  getDepInfo() { //获取所有科室排班医生信息
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      hospId: that.data.checkHospitalId, // 医院ID
      depId: '', // 科室ID
      currentDate: '', // 排班日期

    }
    base.getData(base.server1 + app.getDepInfo, data, false).then(res => {
      that.setData({
        doctor: res.data.list,
      })

      that.getAllDep();
    })
  },
  getAllDep() { //获取全部科室信息
    let that = this;
    let data = {
      openid: wx.getStorageSync('openId'),
      timestamp: wx.getStorageSync('timestamp'),
      token: wx.getStorageSync('token'),
      hospId: that.data.checkHospitalId, // 医院ID
    }
    base.getData(base.server1 + app.getAllDep, data, false).then(res => {
      let dep = res.data;
      let doctor = that.data.doctor;
      for (let i in dep) {
        for (let j in doctor) {
          if (doctor[j].hospDepId == dep[i].hospDepId) {
            doctor[j].depName = dep[i].depName
          }
        }
      }
      that.setData({
        doctor: doctor,
        loading: true
      })
    })
  },
  toChooseAppTime(e) { //去选择就诊时间
    let docName = e.target.dataset.item.doctorName + (e.target.dataset.item.depName ? ' | ' + e.target.dataset.item.depName : '')
    wx.navigateTo({
      url: '/pages/app-time/app-time?dId=' + e.target.dataset.item.doctorId + '&docName=' + docName + '&patientId=' + this.data.patientId,
    })
  }
})