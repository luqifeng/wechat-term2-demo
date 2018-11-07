// client/pages/comment-preview/comment-preview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    commentValue: '',
    commentImages: [],
    movie: [],
    tempFilePath: '',
    commentType: 0,
    comment: '',
  },

  getMovie(id) {
    wx.showLoading({
      title: '商品数据加载中...',
    })

    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data);

        if (!data.code) {
          this.setData({
            movie: data.data
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: () => {
        wx.hideLoading()

        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },

  listentComment(){
    var that = this
    wx.downloadFile({
      url: that.data.tempFilePath, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        if (res.statusCode === 200) {

          innerAudioContext.src = res.tempFilePath
          //console.log(innerAudioContext)
          innerAudioContext.play({
            success(res) {
              console.log(res)
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  backComment(){
    if (this.data.commentType == 0) {
      wx.navigateTo({
        url: `/pages/add-comment/add-comment?id=${this.data.movie[0].id}&type=${this.data.commentType}&content=${this.data.commentValue}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/add-comment/add-comment?id=${this.data.movie[0].id}&type=${this.data.commentType}&fileUrl=${this.data.tempFilePath}`
      })
    }
  },

  addComment(){

    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        commentType: this.data.commentType,
        fileUrl: this.data.tempFilePath,
        content: this.data.commentValue,
        movie_id: this.data.movie[0].id
      },
      success: result => {
        wx.hideLoading()
        console.log(result)
        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '发表评论成功'
          })

          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/comment/comment?id=${this.data.movie[0].id}`
            })
          }, 1500)
        } else {
          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          })
        }
      },
      fail: (res) => {
        console.log(res)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '发表评论失败'
        })
      }
    })

   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getMovie(options.id)
    let product = {
      id: options.id,
    }
    this.setData({
      product: product,
      commentType: options.type,
      commentValue: options.content || '',
      tempFilePath: options.fileUrl || '',
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