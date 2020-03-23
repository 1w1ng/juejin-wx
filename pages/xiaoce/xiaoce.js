const config = getApp().globalData.config;
const utils = require("../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    xiaoceList: [],
    hasData: true,
    // auth: {},
    pageNum: 1
  },
  onLoad() {
    this.setData({
      // auth: wx.getStorageSync("auth"),
      xiaoceList: [],
      pageNum: 1
    });
    this.getXiaoce();
  },
  onPullDownRefresh() {
    this.onLoad();
  },
  onReachBottom() {
    if (!this.data.xiaoceList.length || this.data.hasData) {
      this.getXiaoce();
    }
  },
  // 获取小册数据
  getXiaoce() {
    // let auth = this.data.auth;
    if (this.data.hasData) {
      wx.showLoading({
        title: "正在加载中…"
      });
      request({
        url: `${config.xiaoceRequestUrl}/getListByLastTime`,
        data: {
          src: "web",
          // uid: auth.uid || "",
          // device_id: auth.clientId,
          // token: auth.token,
          pageNum: this.data.pageNum
        }
      }).then(res => {
        console.log("res: ", res);
        let pageNum = this.data.pageNum + 1;
        this.setData({
          pageNum,
          xiaoceList: this.data.xiaoceList.concat(res)
        });
      });
    }
  },
  onShareAppMessage(res) {
    return {};
  }
});
