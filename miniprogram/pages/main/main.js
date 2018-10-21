// miniprogram/pages/main/main.js
const db = wx.cloud.database();
const book = db.collection('newBook');
let path = 'cloud://cumtbook-507109.6375-cumtbook-507109/add.png';
let app=getApp().this;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    pic1: path,
    pic2: path,
    submitAble: false
  },

  takePic: function(event) {
    var that = this;
    console.log(event);
    wx.chooseImage({
      count: 1,
      success: function(res) {
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来

        var filePath = res.tempFilePaths[0];
        var session_key = wx.getStorageSync('session_key');
        console.log('文件路径： ' + filePath);
        that.uplaodFile(filePath, that.data.openId + '_' + Date.now(),
          event.currentTarget.id);
      },

      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }
    })

  },
  uplaodFile: function(filePath, cloudPath, id) {
    var that = this;
    console.log('id:  ' + id);
    wx.showLoading({
      title: '正在上传',
    })
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath, // 小程序临时文件路径
      success: res => {
        // get resource ID
        console.log('文件ID  ' + res.fileID);
        if (id == 'pic1') {
          that.setData({
            pic1: res.fileID
          });
        } else {
          that.setData({
            pic2: res.fileID
          });
        }
        console.log('图片pic2地址  ' + that.data.pic2);
        console.log('图片pic1地址  ' + that.data.pic1);
      },
      fail: err => {
        // handle error
        console.log(err);
      },
      complete: res => {
        wx.hideLoading();
      }
    })

  },

  addBook: function(res) {
   
    var bookname = res.detail.value.bookname;
    var grade = res.detail.value.grade;
    var price = res.detail.value.price;
    var detail = res.detail.value.detail;
    var pic1=this.data.pic1;
    var pic2=this.data.pic2;
    if (bookname == '') {
      this.showStringToast('请输入书名');

      return;
    };

    if (price == '') {
      this.showStringToast('请输入价格');

      return;
    };
    if (grade == '') {
      this.showStringToast('请输入适用年级');

      return;
    };
    if (detail == '') {
      this.showStringToast('请输入书籍描述');

      return;
    };
    if(pic1==path){
      this.showStringToast('请添加书籍正面照');
      return;
    };
    if (pic2 == path) {
      this.showStringToast('请添加书籍反面照');
      return;
    };
    console.log('图片pic2地址  ' + this.data.pic2);
    console.log('图片pic1地址  ' + this.data.pic1);
    console.log('图片path地址  ' + path);
    book.add({
      data: {
        bookname: bookname,
        grade: grade,
        price: price,
        detail: detail,
        creaTtime: Date.now(),
        pic:[pic1,pic2],
      }
       

    }).then(res => {
      console.log(res)
      this.setData({
        submitAble:false,
      })
    }).catch(
      console.error
    )
  },

  showStringToast: function(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getOpenId: function() {
    var that = this;
    wx.cloud.callFunction({

      // 要调用的云函数名称
      name: 'login',
      // 传递给云函数的参数

      success: res => {
        // output: res.result === 3
        console.log(res.result.openid);

        that.setData({
          openId: res.result.openid
        })
      },
      fail: err => {
        // handle error
        console.log(res)
      },
      complete: () => {
        // ...

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.openId == '') {
      this.getOpenId();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})