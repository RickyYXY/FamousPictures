// pages/wxml/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgpath1: '', //目标图片
    imgpath2: '', //模板图片
    imgpath3: '', //结果图片

    hidden:true,      //结果是否隐藏
    templatepaths:[], //模板图片
    inipaths:[],      //初始化模板图片路径
    loadtemplate:false, //是否已加载过模板
    num:6,              //模板数量
    type:0              //选中模板编号
  },

  chooseImage: function (e) {
    var that = this
    wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
            // console.log(e.currentTarget.dataset.a);
            var img = res.tempFilePaths.toString();
            var imgFormat = img.split(".")[(img.split(".")).length - 1];
            if (imgFormat != "png" && imgFormat != "jpg" && imgFormat != "jpeg" &&
            imgFormat != "PNG" && imgFormat != "JPG" && imgFormat != "JPEG") {
              return wx.showToast({
                title: 'you coule only upload .png and .jpg photo!',
                icon: 'none',
                image: '',
                duration: 2000,
                mask: true,
              })
            }
            if(e.currentTarget.dataset.a == "1"){
              that.setData({
                imgpath1: res.tempFilePaths
             })
            }
            else{
              that.setData({
              imgpath2: res.tempFilePaths
           })
          } 
        }
    });
  },

  uploadImage: function(){
    var that = this
    var imgurl = ''
    var success = true
    if(this.data.imgpath1=='' || this.data.imgpath2==''){
      return wx.showToast({
        title: 'please choose your photo and style!',
        icon: 'none',
        duration: 2000
      })
    }
    wx.showLoading({
      title:'loading',
      mask:true
    })
    wx.uploadFile({
      url: 'http://81.68.164.161/api/v1/img/stylize/create', //url
      filePath: this.data.imgpath1.toString(),
      name: 'img',
      formData:{
        type:that.data.type
      },
      success:function(res){
        console.log(res.data)
        if (res.statusCode !== 200) {
          that.complete(false)
        }
        else{
          imgurl = res.data.match('http:.*jpg')[0]
          if(that.downloadImage(imgurl.toString())){
            that.complete(true)
          }
          else{
            that.complete(false)
          }
        }
      },
      // fail: that.complete(false)
    })
  },

  complete:function(success){
    wx.hideLoading()
    if(success){
      wx.showToast({
        title: "success！",
        icon: 'success',
        duration: 2000
      })
    }
    else{
      wx.showToast({
        title: "error！",
        icon: 'none',
        duration: 2000
      })
    }
  },

  downloadImage:function(imgurl){
    var that = this
    var success = true
    imgurl = imgurl.toString()
    wx.downloadFile({
      url: imgurl,
      success: success=function(res){
        if (res.statusCode === 200) {
          that.setData({
            imgpath3:res.tempFilePath,
            hidden:false
          })
          return true
        }
        else{
          return false
        }
      }
    })
    return success
  },

  saveImage:function(){
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.openSetting({
            success(res) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                complete() {}
              })
            }
          })
        }else{
          wx.saveImageToPhotosAlbum({
            filePath: that.data.imgpath3,
            success(result) {
              wx.showToast({
                title: 'success！',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
  
  choosetempalte:function(){
    var that = this
    if(!that.data.loadtemplate){
      wx.showLoading({
        title:'loading',
        mask:true
      })
      Promise.all(that.getTempalte())
      .then(
        function() {
          console.log('success')
          new Promise((resolve,reject)=>{
            that.setData({loadtemplate:true})
          }).then(wx.navigateTo({url: '../tempaltes/tempaltes'}))
          wx.hideLoading({
            success: () => {}
          })
        },
        function(error) {
          // failure
          console.log(error)
          wx.showToast({
            title: 'file to get styles',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            templatepaths:that.data.inipaths
          })
        }
      ).catch(err=>{
        console.log(err)
          wx.showToast({
            title: 'file to get styles',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            templatepaths:that.data.inipaths
          })
      })
    }
    else{
      wx.navigateTo({
        url: '../tempaltes/tempaltes'
      })
    }
  },

  getTempalte:function(){
    var that = this
    let  PromiseArr = []
    for(var i = 1; i <= this.data.num; i++){
      PromiseArr.push(new Promise((resolve, reject)=>{
        var num = i - 1
        var str = 'templatepaths[' + num + ']'
        wx.downloadFile({
          url: 'http://qiak0fqjn.hn-bkt.clouddn.com/wstyle' + i + '.jpg',
          success:res=>{
            console.log(num, str)
            if (res.statusCode == 200) {
              that.setData({
                [str]: res.tempFilePath
              })
              resolve(num)
            }
            else{
              reject(console.error())
              throw new Error('fail')
            }
          },
        })
      }))
    }
    return PromiseArr
  },

  tap: function() {
    this.setData({
      loading: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
        complete() {
           
        }
    })
    let arr = []
    for(let i  = 0; i < this.data.num; i++){
      arr = arr.concat([''])
    }
    this.setData({
      inipaths: arr
    })
  //  Promise.all(this.data.getTempalte())
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
    return {
      imageUrl:this.data.imgpath3
    }
  }
})