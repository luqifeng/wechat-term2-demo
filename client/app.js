//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

let userInfo

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },

    login({ success, error }) {
      wx.getSetting({
        
        success: res => {
          console.log("getSetting:success")
          if (res.authSetting['scope.userInfo'] === false) {
            // 已拒绝授权
            console.log("无授权，准备获取。")
            wx.showModal({
              title: '提示',
              content: '请授权我们获取您的用户信息',
              showCancel: false,
              success: () => {
                wx.openSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo'] === true) {
                      this.doQcloudLogin({ success, error })
                    }
                  },
                  fail: (result) => {
                    console.log("login-s:fail")
                    console.log(result)
                    console.log(res)
                  }
                })
              }
            })
          } else {
            this.doQcloudLogin({ success, error })
          }
        },
        fail: (result) => {
          console.log("login:fail")
          console.log(result)
          error && error()
        }
      })
    },

    doQcloudLogin({success, error}) {
      // 调用 qcloud 登陆接口
      qcloud.login({
        success: result => {
          if (result) {
            console.log("qcloud.login:success")
            userInfo = result

            success && success({
              userInfo
            })
          } else {
            console.log("qcloud.login:else")
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            this.getUserInfo({ success, error })
          }
        },
        fail: (result) => {
          console.log("doQcloudLogin:fail")
          console.log(result)
          error && error()
        }
      })
    },

    getUserInfo({ success, error }){
      if (userInfo) return userInfo

      qcloud.request({
        url: config.service.user,
        login: true,
        success: result => {
          let data = result.data

          if (!data.code){
            userInfo = data.data

            success && success({
              userInfo
            })
          } else {
            error && error()
          }
        },
        fail: (result) => {
          console.log("getUserInfo:fail")
          console.log(result)
          error && error()
        }
      })
    },

    checkSession({ success, error }) {
      if (userInfo) {
        return success && success({
          userInfo
        })
      }

      wx.checkSession({
        success: () => {
          this.getUserInfo({
            success: res => {
              userInfo = res.userInfo

              success && success({
                userInfo
              })
            },
            fail: (result) => {
              console.log("checkSession-s:fail")
              console.log(result)
              error && error()
            }
          })
        },
        fail: (result) => {
          console.log("checkSession:fail")
          console.log(result)
          error && error()
        }
      })
    }

})