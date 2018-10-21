// miniprogram/pages/sell/sell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scan: '../../images/scan_nomal.png'

  },
  touchstart: function(res) {
    console.log(res),
    this.setData({
      scan: '../../images/scan_presser.png'
    })
  },
  touchcancel: function(res) {
    console.log(res)
  },
  touchmove: function(res) {
    console.log(res)
  },
  touchend: function(res) {
    console.log(res);
    this.setData({
      scan: '../../images/scan_nomal.png'
    })
  },
  scanBar: function(res) {
    var that=this;
    console.log(res);
    wx.scanCode({
      scanType: ['barCode'],
      success:function(res){
        console.log('scanCode结果'),
        console.log(res.result),

      wx.navigateTo({
          url: '../scanResult/scanResult?isbn='+res.result,
      })

       

      }
    });
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