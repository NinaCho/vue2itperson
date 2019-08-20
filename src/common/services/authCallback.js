// const api = require("../../objects/departmentApi.js");
const user = require('./user.js')

const login = function({ success, fail }) {
  // var weakThis = this;
  // user.accessToken = null;
  wx.qy.login({
    success: res => {
      // const wxCode = res.code
      /*
      if (wxCode) {
        // 发起网络请求
        api.postDs({
          path: api.path.sellerAuthLogin,
          param: {
            code: code
          },
          success: function (response) {
            // 网络请求成功
            var code = Number(response.data.code);
            if (code == 200) {
              var shoppeInfo = response.data.data;
              success();
            } else {
              // 登录失败
              fail(response.data.message || "");
            }
          },
          fail: function (response) {
            // 网络请求失败
            fail("");
          }
        });
      } else {
        // 登录失败
        fail(res.errMsg || "");
      }
      */
    },
    fail: function(res) {
      fail(res.errMsg || '')
    }
  })
}

// 检查登录
const checkLogin = function({ success, fail }) {
  wx.qy.checkSession({
    success: res => {
      // session_key 未过期，并且在本生命周期一直有效
      if (user.accessToken == null) {
        // 用户信息不全，重新登录
        login({ success, fail })
      } else {
        // 页面跳转
        success()
      }
    },
    fail: function() {
      login({ success, fail })
    }
  })
}

module.exports = {
  checkLogin: checkLogin
}
