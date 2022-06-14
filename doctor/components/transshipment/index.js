import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Component({

  properties: {},
  data: {},
  methods: {
    onClick(e) {
      let val = parseInt(e.target.dataset.id);
      let url = ""
      if (1 === val) {
        url = "https://mp.weixin.qq.com/s/AyAyMN0Pg8SDHJwO0RSN0A";
      } else if (2 === val) {
        url = "https://mp.weixin.qq.com/s/Sas72saXosynmXz4eXP_Mw";
      } else if (3 === val) {
        url = "https://mp.weixin.qq.com/s/03t41NAkpG8h7OaObrKHWA";
      } else if (4 === val) {
        url = "https://mp.weixin.qq.com/s/qkyp5YRq7H05vypr0UJpoA";
      } else if (5 === val) {
        url = "https://mp.weixin.qq.com/s/UJYCmcW-zjHctFtifDdgvQ";
      } else if (6 === val) {
        url = "https://mp.weixin.qq.com/s/2dRFLsqUDp6DyOlTuhHkiw";
      } else if (7 === val) {
        url = "https://mp.weixin.qq.com/s/C9eGuM_kVWYXVrvPP7MWqw";
      } else if (8 === val) {
        url = "https://mp.weixin.qq.com/s/xAIgltdvP6sSoePSTmpF_A";
      } else if (9 === val) {
        url = "https://mp.weixin.qq.com/s/n3NhKHIDLJRSQPPZVaC8Dw";
      } else if (10 === val) {
        url = "https://mp.weixin.qq.com/s/wAFmn2qmhssZCemqrT1jlQ";
      } else {
        return;
      }

      /*wx.showLoading({
        title: '加载中',
      });

      const fileExtName = ".pdf";
      const randfile = new Date().getTime() + fileExtName;
      const newPath = `${wx.env.USER_DATA_PATH}/${randfile}`;

      this.deleteContract();
      wx.downloadFile({
        url: url,
        filePath: newPath,
        success: function (res) {
          const filePath = res.filePath;
          wx.openDocument({
            filePath: newPath,
            showMenu: true,
            fileType: 'pdf',
            success: function (res) {
            }
          })
          wx.hideLoading();
        },
        fail: function (res) {
          wx.hideLoading();
        }
      })*/
    },
    deleteContract() {
      try {
        let file = wx.getFileSystemManager();
        file.readdir({
          dirPath: `${wx.env.USER_DATA_PATH}`,
          success: res => {
            if (res.files.length > 2) {
              file.unlink({
                filePath: `${wx.env.USER_DATA_PATH}/${res.files[0]}`,
                complete: res => {

                }
              })
            }
          }
        })
      } catch (error) {

      }
    },
    onDownloadMp4() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '下载中...'
      });

      let link = "https://sh.eyescare.cn/sh/upload/knowledge/004.mp4";
      let fileName = new Date().valueOf();

      const downloadTask = wx.downloadFile({
        url: link,
        filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
        success: res => {
          // console.log(res);
          let filePath = res.filePath;
          wx.saveVideoToPhotosAlbum({
            filePath,
            success: file => {
              Toast.success('保存成功');
              let fileMgr = wx.getFileSystemManager();
              fileMgr.unlink({
                filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
                success: function (r) {

                },
              })
            },
            fail: err => {
              if (err.errMsg === 'saveVideoToPhotosAlbum:fail auth deny') {
                Dialog.alert({
                  title: '提示',
                  message: '需要您授权保存至相册'
                }).then(() => {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        Notify({type: 'primary', message: '获取权限成功,再次点击下载即可保存'});
                      } else {
                        Notify({type: 'primary', message: '获取权限失败，将无法保存到相册哦~'});
                      }
                    },
                  })
                });
              }
            }
          })
        }
      })
      // 获取 downloadTask 监听内容赋值到进度条
      downloadTask.onProgressUpdate((res) => {
        toast.setData({
          message: `已下载 ${res.progress} %`,
        });
        if (res.progress === 100) {
          Toast.clear();
        }
        // console.log(res.progress + '%');
      })
    }
  }

})

