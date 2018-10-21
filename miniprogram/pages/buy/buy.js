// miniprogram/pages/buy/buy.js
const db = wx.cloud.database();
const newBook = db.collection("newBook");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [{
      _id: '1',
      _openid: 'opendi',
      bookname: 'bookn大幅度ame',
      grade: 'grade',
      detail: 'detail',
      pic: ['cloud://cumtbook-507109.6375-cumtbook-507109/add.png', 'cloud://cumtbook-507109.6375-cumtbook-507109/add.png']

    }]
  },
  // 
  getBooks: function() {
    console.log('getbook调用了');
    newBook.orderBy('creaTtime', 'asc').get().then(res => {
      console.log(res);
      this.setData({
        books: res.data
      })
    })
  },

  bookDetail: function(res) {
    // var index = parseInt(res.currentTarget.dataset.index);
    // console.log(res);
    // wx.navigateTo({
    //   url: '../bookDetail/bookDetail?_id=' + this.data.books[index]._id,
    // })
    wx.scanCode({
      success:function(res){
        console.log('扫描结果：');
        console.log(res);
      }
    })
    //{result: "16925720", charSet: "UTF-8", errMsg: "scanCode:ok", scanType: "UPC_E", rawData: "MTY5MjU3MjA="}  9787040108200
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
    this.getBooks()
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