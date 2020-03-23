const config = getApp().globalData.config;
const utils = require("../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    tagList: [],
    auth: {},
    thirduid: ""
  },
  onLoad(query) {
    if (query && query.thirduid) {
      let thirduid = query && query.thirduid;
      this.setData({
        thirduid
      });
    }
    let auth = utils.isLogined();
    this.setData({
      auth
    });
    this.getSubscribedTag();
  },

  // 获取标签
  getSubscribedTag() {
    const auth = this.data.auth;
    request({
      header: {
        "X-Juejin-Src": "web",
        "X-Juejin-Client": auth.clientId || "",
        "X-Juejin-Token": auth.token || "",
        "X-Juejin-Uid": auth.uid || ""
      },
      url: `${config.goldTagMsRequestUrl}/user/${this.data.thirduid || auth.uid}/subscribe`
    }).then(res => {
      let tagList = (res && res.tagList) || [];
      if (!utils.isEmptyObject(tagList)) {
        this.setData({
          tagList
        });
      }
    });
  }
});
