const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    commentList: [], // 评论列表
  },

  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src
    let urls = target.dataset.urls
 
    wx.previewImage({
      current: src,
      urls: urls
    })
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.movieComments +"?movie_id="+this.data.movie.id,

      success: result => {
        let data = result.data
        console.log(data)
        if (!data.code) {
          this.setData({
            commentList: data.data
            
          })
        }
      },
    })
  },

  listentComment(event){
    console.log(event)
    wx.downloadFile({
      url: event.currentTarget.dataset.url, //仅为示例，并非真实的资源
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movie = {
      id: options.id,
    }
    this.setData({
      movie: movie
    })
    console.log(movie)
    
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
    this.getCommentList(this.data.movie.id)
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