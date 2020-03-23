const config = getApp().globalData.config;
const utils = require("./../../utils/utils.js");
const WxParse = require("./../../wxParse/wxParse.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    postInfo: {}, // 详情数据
    type: "" // 类型
  },
  onLoad(options) {
    console.log("options: ", options);
    // 1. 处理数据
    let type = options.type;
    let id = options.id;
    this.setData({
      type
    });

    // 2. 获取网络数据
    this.getUserById(id);
    this.getArticleDetail(id);
  },
  // 获取文章头部信息
  getUserById(articleId) {
    request({
      url: `${config.timelineRequestUrl}/get_entry_by_ids`,
      data: {
        src: "web",
        entryIds: articleId
      }
    }).then(res => {
      let entrylist = (res && res.entrylist) || [];
      this.setData({
        postInfo: entrylist[0] || {}
      });
      // 改变标题
      wx.setNavigationBarTitle({
        title: (entrylist[0].user && entrylist[0].user.username) || "文章详情"
      });
    });
  },

  // 获取文章内容信息
  getArticleDetail(articleId) {
    request({
      url: `${config.entryviewStorage}/getEntryView`,
      data: {
        src: "web",
        entryId: articleId
      }
    }).then(res => {
      let content = (res && res.content) || "";
      console.log("content: ", content);
      WxParse.wxParse("article", "html", content, this);
    });
  }
});
