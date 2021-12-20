var base = require("./utils/base.js");
const updateManager = wx.getUpdateManager();
// var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');
// var AppId = 'wxdd9053e502bb8b9e';
// var AppSecret = '0b1b4be6f4ec6ee02b189d85ce96fa38';
App({

  getOpenId: 'api/user/getOpenIdByCode.do', //获取openid
  getInfo: 'api/user/get.do', //获取个人资料
  setInfo: 'api/user/save.do', //编辑个人资料

  getReportList: 'api/examinedata/dataQuery.do', //微信家长获取已绑定学生的体检报告接口
  getReportInfo: 'api/examinedata/get.do', //微信根据体检报告ID获取的体检明细接口

  addGuardian: 'api/refstudentguardian/bind.do', //新增身份绑定
  queryGuardianList: 'api/refstudentguardian/dataQuery.do', //获取身份绑定
  deleteGuardian: 'api/refstudentguardian/delete.do', //删除身份绑定

  updateUnionId: "api/wechat/updateUnionId.do", //返回unionid

  getMyAppInfo: "api/appointment/getMyAppointments.do", //获取我的预约信息接口

  getAllDep: "api/hospitalinfo/getDepartmentByHospId.do", //根据医院ID获取全部科室接口

  getDepInfo: "api/doctorschedule/getDoctorscheduleByDepId.do", //根据医院ID和科室ID获取全部排班医生接口

  getScheduleInfo: "api/doctorschedule/getDoctorscheduleItemByDoctorId.do", //根据医生ID获取排班信息接口

  patientInfo: "api/patientinfo/save.do", //学生信息转为病人接口接口

  appDoctor: "api/appointment/order.do", //添加预约接口

  cancelApp: "api/appointment/updateAppointment.do", //取消预约接口

  dataQueryByIdNumber: 'api/examinesheet/dataQueryByIdNumber.do', //获取屈光档案数据接口

  getDataBySheetId: 'api/examinesheet/getDataBySheetId.do', //获取屈光档案数据明细

  userLogin() { //用户登录(获取openid)
    let that = this;
    wx.login({
      success: res => {
        var data = {
          code: res.code,
        }
        base.postData(base.server + 'api/wechat/getCode.do', data, false).then(res => {
          wx.setStorageSync('openId', res.openId);
          wx.setStorageSync('timestamp', res.timestamp)
          wx.setStorageSync('token', res.token)
          // wx.setStorageSync('openId', "oQEVB5CVOTjQ-ERQsPdSdMqY0wbM");
          // wx.setStorageSync('timestamp', "1624935268968")
          // wx.setStorageSync('token', "f95bf3d47f7f21248938d519cfd4c2dc06150f1e")
          // wx.setStorageSync('sessionKey', res.data);


          let pages = getCurrentPages();
          pages[pages.length - 1].onLoad();
          pages[pages.length - 1].onShow();
        })
      }
    })
  },
  onLaunch() {
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版已上线，需重启更新',
        showCancel: false,
        success: res => {
          wx.clearStorage();
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      // 新版本下载失败
    })
  },
  globalData: {
    userInfo: null,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": ""
    },
  }
})
