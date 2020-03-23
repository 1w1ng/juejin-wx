const config = getApp().globalData.config;
const utils = require("./../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    userNotifyNum: 0, // 通知数据
    auth: {} // 登录信息
  },
  onShow() {
    // 1. 获取本地的用户信息
    let auth = utils.isLogined();
    this.setData({
      auth
    });
    // 2. 如果用户已经登录
    if (auth) {
      // 2.1 获取用户信息
      this.getUserInfo();
      this.getUserNotifyNum();
    } else {
      this.setData({
        userInfo: {}, // 用户信息
        userNotifyNum: 0 // 通知数据
      });
    }
  },

  // 获取用户信息
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

  // 获取通知数据
  getUserNotifyNum() {
    const auth = this.data.auth;
    request({
      url: `${config.notifyApiUrl}/getUserNotificationNum`,
      data: {
        src: "web",
        uid: auth.uid,
        token: auth.token
      }
    }).then(res => {
      this.setData({
        userNotifyNum: res && res.notification_num
      });
    });
  },

  onMineCell(e) {
    return utils.navigatItem(e);
  }
});
