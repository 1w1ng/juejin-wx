const utils = require("../../utils/utils.js");
const config = getApp().globalData.config;
import { request } from "../../utils/http.js";

Page({
  data: {
    userInfo: {},
    auth: {}
  },
  onLoad() {
    let auth = utils.isLogined();
    this.setData({
      auth
    });
    if (auth) {
      this.getUserInfo();
    }
  },
  // 获取个人信息
  getUserInfo() {
    const auth = this.data.auth;
    request({
      url: `${config.userApiUrl}/getUserInfo`,
      data: {
        src: "web",
        device_id: auth.clientId,
        uid: auth.uid,
        token: auth.token,
        current_uid: auth.uid
      }
    }).then(res => {
      this.setData({
        userInfo: res
      });
    });
  },

  // 清除缓存
  clearStorage() {
    wx.clearStorage({
      success: () => {
        wx.switchTab({
          url: "/pages/mine/mine"
        });
      }
    });
  },

  // 退出登录
  signout() {
    wx.showModal({
      title: "提示",
      content: "确定退出?",
      cancelColor: "#3281ff",
      confirmColor: "#3281ff",
      success: result => {
        if (result.confirm) {
          wx.removeStorage({
            key: "auth",
            success: () => {
              wx.switchTab({
                url: "/pages/mine/mine"
              });
            }
          });
        }
      }
    });
  }
});
