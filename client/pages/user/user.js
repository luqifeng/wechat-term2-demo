// pages/user/user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    commentList: [],
    array: ['我的评价', '我的收藏'],
    index:0,
  },

  onTapLogin() {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
        console.log(userInfo)
      },

    })
  },

  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    switch (e.detail.value){
      case '0':
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.getMyComments()
        break;
      case '1':
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.getMyCollections()
        break;
    }
    console.log("fff")
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

  getMyComments() {
    wx.showLoading({
      title: '刷新电影数据...',
    })
    console.log(this.data.userInfo)
    qcloud.request({
      url: config.service.myCommentList,
      login: true,
      // data: {
      //   user: this.data.userInfo['openId']
      // },
      success: result => {
        wx.hideLoading()
        let data = result.data
        console.log(data)
        if (!data.code) {
          this.setData({
            commentList: data.data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '数据刷新失败',
          })
        }
      },
      fail: (result) => {
        console.log(result)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '数据刷新失败',
        })
      }
    })
  },

  getMyCollections() {
    wx.showLoading({
      title: '刷新电影数据...',
    })
    console.log(this.data.userInfo)
    qcloud.request({
      url: config.service.myCollectionList,
      login: true,
      // data: {
      //   user: this.data.userInfo['openId']
      // },
      success: result => {
        wx.hideLoading()
        let data = result.data
        console.log(data)
        if (!data.code) {
          this.setData({
            commentList: data.data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '数据刷新失败',
          })
        }
      },
      fail: (result) => {
        console.log(result)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '数据刷新失败',
        })
      }
    })
  },

  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },

  onTapKf() {
    wx.showToast({
      icon: 'none',
      title: '此功能暂未开放'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    app.checkSession({
      success: ({ userInfo }) => {
        console.log(userInfo)
        this.setData({
          userInfo
        })
        this.getMyComments()
      }
      
    })
    
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
    wx.stopPullDownRefresh()
    this.getMyComments()
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