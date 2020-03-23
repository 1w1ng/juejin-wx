const WxParse = require("../../wxParse/wxParse.js");
const config = getApp().globalData.config;
const utils = require("../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    auth: {},
    // 作者信息
    author: {},
    // 小册内容
    sections: []
  },
  onLoad: function(options) {
    console.log("options: ", options);
    let auth = utils.isLogined();
    this.setData({
      auth
    });
    let id = options.id;
    this.getAuthorDetail(id);
    this.getXiaoceDetail(id);
  },
  toProbation(e) {
    let dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/probation/probation?id=${dataset.sectionid}&isFree=${dataset.isfree}`
    });
  },
  // 获取作者信息
  getAuthorDetail(id) {
    request({
      url: `${config.xiaoceCacheApiMs}/get`,
      data: {
        src: "web",
        id
      }
    }).then(res => {
      let author = res;
      this.setData({
        author
      });
      // 设置 title 为小册标题
      wx.setNavigationBarTitle({
        title: author.title || "小册"
      });
      let article = author.summaryHtml || "";
      WxParse.wxParse("article", "html", article, this);
    });
  },
  // 获取小册内容
  getXiaoceDetail(id) {
    let auth = this.data.auth;
    request({
      url: `${config.xiaoceCacheApiMs}/getListSection`,
      data: {
        src: "web",
        uid: auth.uid || "",
        // client_id: auth.clientId,
        // token: auth.token,
        id
      }
    }).then(res => {
      console.log("res: ", res);
      let sections = res;
      if (!utils.isEmptyObject(sections)) {
        this.setData({
          sections
        });
      }
    });
  }
});
