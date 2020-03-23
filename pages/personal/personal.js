const utils = require("../../utils/utils.js");
const config = getApp().globalData.config;
import { request } from "../../utils/http.js";

Page({
  data: {
    userInfo: {},
    auth: {},
    thirduid: ""
  },
  onLoad() {
    let auth = utils.isLogined();
    this.setData({
      auth
    });
    this.getUserInfo();
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

  showDataTrend() {
    wx.navigateTo({
      url: "/pages/articleData/articleData"
    });
  },

  onMineCell(e) {
    return utils.navigatItem(e);
  }
});
