// pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const recorderManager = wx.getRecorderManager()
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
    comment:'',
  },

  startRecord(){
    recorderManager.start()
  },

  stopRecord() {
    recorderManager.stop()
    recorderManager.onStop((res) => {
      var that = this
      this.setData({
        tempFilePath : res.tempFilePath
      })
      console.log(res.tempFilePath)
      innerAudioContext.src = res.tempFilePath
      innerAudioContext.play()
      this.uploadFile()
    })
    
  },

  previewComment() {
    if (this.data.commentType == 0){
      wx.navigateTo({
        url: `/pages/comment-preview/comment-preview?id=${this.data.movie[0].id}&type=${this.data.commentType}&content=${this.data.commentValue}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/comment-preview/comment-preview?id=${this.data.movie[0].id}&type=${this.data.commentType}&fileUrl=${this.data.tempFilePath}`
      })
    }
    
  },

  //播放声音
  uploadFile: function () {
    var that = this
    wx.uploadFile({
      url: 'https://740832986.lqf.name/weapp/upload', //仅为示例，非真实的接口地址
      filePath: that.data.tempFilePath,
      name: 'file',
      success(res) {
        //data = res.data
        console.log(res)
        that.setData({
          tempFilePath: JSON.parse(res.data).data.imgUrl
        })
        console.log(that.data.tempFilePath)
      },
      fail(res) {
        console.log(res)
      }
    })
    

  },

  getMovie(id) {
    wx.showLoading({
      title: '电影数据加载中...',
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

  uploadImage(cb) {
    let commentImages = this.data.commentImages
    let images = []

    if (commentImages.length) {
      let length = commentImages.length
      for (let i = 0; i < length; i++) {
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: commentImages[i],
          name: 'file',
          success: res => {
            let data = JSON.parse(res.data)
            length--

            if (!data.code) {
              images.push(data.data.imgUrl)
            }

            if (length <= 0) {
              cb && cb(images)
            }
          },
          fail: () => {
            length--
          }
        })
      }
    } else {
      cb && cb(images)
    }
  },

  onInput(event) {
    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  chooseImage() {
    let currentImages = this.data.commentImages

    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {

        currentImages = currentImages.concat(res.tempFilePaths)

        let end = currentImages.length
        let begin = Math.max(end - 3, 0)
        currentImages = currentImages.slice(begin, end)

        this.setData({
          commentImages: currentImages
        })
        
      },
    })
  },

  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src

    wx.previewImage({
      current: src,
      urls: this.data.commentImages
    })
  },

  addComment(event) {
    let content = this.data.commentValue
    if (!content) return

    wx.showLoading({
      title: '正在发表评论'
    })

    this.uploadImage(images => {
      qcloud.request({
        url: config.service.addComment,
        login: true,
        method: 'PUT',
        data: {
          images,
          content,
          product_id: this.data.product.id
        },
        success: result => {
          wx.hideLoading()

          let data = result.data

          if (!data.code) {
            wx.showToast({
              title: '发表评论成功'
            })

            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              icon: 'none',
              title: '发表评论失败'
            })
          }
        },
        fail: () => {
          wx.hideLoading()

          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id)
    let product = {
      id: options.id,
    }
    this.setData({
      product: product,
      commentType: options.type,
      comment: options.comment || '',
      commentValue: options.comment || ''
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