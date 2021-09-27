const app = getApp()

Page({
    data: {},
    onLoad() {

    },
    onShow: function () {

    },
    onClick(e) {
        let val = parseInt(e.target.dataset.id);
        let url = ""
        if (1 === val) {
            url = "https://sh.eyescare.cn/sh/upload/knowledge/001.pdf";
        } else if (2 === val) {
            url = "https://sh.eyescare.cn/sh/upload/knowledge/002.pdf";
        } else if (3 === val) {
            url = "https://sh.eyescare.cn/sh/upload/knowledge/003.pdf";
        } else if (4 === val) {
            url = "https://sh.eyescare.cn/sh/upload/knowledge/004.mp4";
        }

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
                    success: function (res) {}
                })
            },
            fail: function (res) {
                wx.hideLoading();
            }
        })
    },
    deleteContract() {
        try {
            let file = wx.getFileSystemManager();
            file.readdir({
                dirPath: `${wx.env.USER_DATA_PATH}`,
                success: res => {
                    console.log(res);
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
    }
})
