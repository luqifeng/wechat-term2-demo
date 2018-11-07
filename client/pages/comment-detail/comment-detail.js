// client/pages/my-comments/my-comments.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie_id:0,
    comment:[],
    comment_id:0,
    haveComment:false,
    haveCollection:false,
    myComment:[],
    myCollection:[],
  },

  getComment(id) {
    wx.showLoading({
      title: '电影数据加载中...',
    })

    qcloud.request({
      url: config.service.commentDetail + id,
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data);

        if (!data.code) {
          this.setData({
            comment: data.data,
            movie_id: data.data[0].movie_id
          })

          qcloud.request({
            url: config.service.checkMyComment + this.data.movie_id,
            success: result => {
              wx.hideLoading()

              let data = result.data
              console.log(data);

              if (!data.code) {
                if (data.data.length > 0) {
                  this.setData({
                    haveComment: true,
                    myComment: data.data
                  })
                }
                console.log(this.data);

              } else {

              }
            },
            fail: (res) => {
              console.log(res)
            }
          })

        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: (res) => {
        console.log(res);
        wx.hideLoading()

        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })

    

    qcloud.request({
      url: config.service.checkMyCollection + id,
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data);

        if (!data.code) {
          if (data.data.length > 0) {
            this.setData({
              haveCollection: true,
              myCollection: data.data
            })
          }
          console.log(this.data);

        } else {

        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },

  

  listentComment(event) {
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


  addComment() {
    var that = this
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      
      success(res) {
        console.log(res.tapIndex)
        switch (res.tapIndex) {
          case 0:
            console.log(this)
            wx.navigateTo({

              url: `/pages/add-comment/add-comment?id=${that.data.movie_id}&type=0`
            })
            break;
          case 1:
            wx.navigateTo({

              url: `/pages/add-comment/add-comment?id=${that.data.movie_id}&type=1`
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  toComment() {
    //console.log(event)
    wx.navigateTo({

      url: `/pages/comment-detail/comment-detail?id=${this.data.myComment[0].comment_id}`
    })
  },

  collectComments() {

    qcloud.request({
      url: config.service.addCollections + this.data.comment_id,
      login: true,
      method: 'GET',
      data: {
        comment_id: this.data.comment_id,
      },
      success: result => {
        wx.hideLoading()
        console.log(result)
        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '收藏成功'
          })

        } else {
          wx.showToast({
            icon: 'none',
            title: '收藏失败'
          })
        }
      },
      fail: (res) => {
        console.log(res)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '收藏失败'
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      comment_id: options.id
    })
    this.getComment(options.id)
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