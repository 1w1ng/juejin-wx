const WxParse = require("../../wxParse/wxParse.js");
const config = getApp().globalData.config;
const utils = require("../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    auth: {},
    free: true
  },
  onLoad(e) {
    console.log("e: ", e);
    let auth = utils.isLogined();
    this.setData({
      auth
    });
    // false = 付费
    if (e.isFree === "false") {
      // let pages = getCurrentPages();
      // // 获取到上一页面的数据
      // let currentPage = pages[pages.length - 2];
      // console.log("currentPage: ", currentPage);
      // let author = currentPage.data.author;
      this.setData({
        free: false
      });
      wx.setNavigationBarTitle({
        title: "购买小册"
      });
      return;
    }
    this.getSection(e.id);
  },
  // 获取作者信息
  getSection(id) {
    wx.showLoading({
      title: "加载中"
    });
    let auth = this.data.auth;
    request({
      url: `${config.xiaoceCacheApiMs}/getSection`,
      data: {
        src: "web",
        uid: auth.uid || "",
        client_id: auth.clientId,
        token: auth.token,
        sectionId: id
      }
    }).then(res => {
      // 设置 title 为小册标题
      wx.setNavigationBarTitle({
        title: res.title || "试读"
      });
      let article = res.html || "";
      WxParse.wxParse("article", "html", article, this);
    });
  }
});
