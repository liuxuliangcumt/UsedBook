// miniprogram/pages/scanResult/scanResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options);
    wx.request({
      url: 'https://douban.uieee.com/v2/book/isbn/' + options.isbn,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },

      success: function(res) {
        console.log("success");
        console.log(res);
        var book=res.data;
        that.setData({
          author: book.author,
          publisher: book.publisher,
          isbn13: book.isbn13,
          price: book.price,
          summary: book.summary,
          author_intro: book.author_intro,
          image: book.image,
          title: book.title
        })
      },
      fail: function(err) {
        console.log("err");
        console.log(err)
      }
    })
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