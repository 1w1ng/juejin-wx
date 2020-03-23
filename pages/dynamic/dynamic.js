const config = getApp().globalData.config;
const utils = require("../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    list: [],
    auth: {},
    thirduid: ""
  },
  onLoad: function(query) {
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
    this.getUserLog();
  },
  getUserLog() {
    const auth = this.data.auth;
    let list = this.data.list;
    if (utils.isEmptyObject(list)) {
      list = [{ beforeAtString: "" }];
    }
    let before = list.slice(-1)[0].beforeAtString || "";
    request({
      url: `${config.ufpApiMsRequestUrl}/getUserLog`,
      data: {
        uid: this.data.thirduid || auth.uid,
        token: auth.token || "",
        src: "web",
        before
      }
    }).then(res => {
      let list = res || [];
      this.setData({
        list: this.data.list.concat(list)
      });
    });
  },
  onReachBottom() {
    this.getUserLog();
  }
});
