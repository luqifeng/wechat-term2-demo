// pages/detail/detail.js

const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: [],
    checkMe: [],
    haveComment:false,
  },

  getProduct(id){
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

    qcloud.request({
      url: config.service.checkMyComment + id,
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data);

        if (!data.code) {
          if(data.data.length>0){
            this.setData({
              haveComment: true,
              checkMe: data.data
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

  addComment(){
    var that = this;
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        console.log(res.tapIndex)
        switch (res.tapIndex){
            case 0 :
              console.log(this)
              wx.navigateTo({

                url: `/pages/add-comment/add-comment?id=${that.data.movie[0].id}&type=0`
              })
              break;
            case 1 :
              wx.navigateTo({

                url: `/pages/add-comment/add-comment?id=${that.data.movie[0].id}&type=1`
              })
              break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  checkComments(){
    
    wx.navigateTo({
      
      url: `/pages/comment/comment?id=${this.data.movie[0].id}`
    })
  },

  checkComment(event) {
    console.log(event)
    wx.navigateTo({

      url: `/pages/comment-detail/comment-detail?id=${event.currentTarget.id}`
    })
  },

  buy(){
    wx.showLoading({
      title: '商品购买中...',
    })

    let product = Object.assign({
      count: 1
    }, this.data.product)

    qcloud.request({
      url: config.service.addOrder,
      login: true,
      method: 'POST',
      data: {
        list: [product],
        isInstantBuy: true
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '商品购买成功',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '商品购买失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '商品购买失败',
        })
      }
    })
  },

  addToTrolley(){
    wx.showLoading({
      title: '正在添加到购物车...',
    })

    qcloud.request({
      url: config.service.addTrolley,
      login: true,
      method: 'PUT',
      data: this.data.product,
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code){
          wx.showToast({
            title: '已添加到购物车',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '添加到购物车失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '添加到购物车失败',
        })
      }
    })

  },

  onTapCommentEntry() {
    let product = this.data.product
    if (product.commentCount) {
      wx.navigateTo({
        url: `/pages/comment/comment?id=${product.id}&price=${product.price}&name=${product.name}&image=${product.image}`
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProduct(options.id)
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