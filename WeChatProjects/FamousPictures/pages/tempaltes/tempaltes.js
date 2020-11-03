// pages/tempaltes/tempaltes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpaths:[],
    num:0
  },
  
  chooseTemplate:function(e){
    var that = this
    var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
    var prevPage = pages[pages.length - 2]    //获取上一个页面
    prevPage.setData({
      type: e.currentTarget.dataset.n,
      imgpath2: that.data.imgpaths[e.currentTarget.dataset.n]
    })
    wx.navigateBack({
      delta: 0,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('load')
    var that = this
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]    //获取上一个页面
    that.setData({
      imgpaths:prevPage.data.templatepaths,
      num:prevPage.data.num
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})