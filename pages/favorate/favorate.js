const config = getApp().globalData.config;
const utils = require("../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    list: [],
    auth: {},
    thirduid: "",
    page: 0
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
    this.getUserLikeList();
  },
  getUserLikeList() {
    const auth = this.data.auth;
    request({
      header: {
        "X-Juejin-Src": "web",
        "X-Juejin-Client": auth.clientId || "",
        "X-Juejin-Token": auth.token || "",
        "X-Juejin-Uid": auth.uid || ""
      },
      url: `${config.userLikeWrapperMsRequestUrl}/user/${this.data.thirduid || auth.uid}/like/entry`,
      data: {
        page: this.data.page,
        pageSize: 20
      }
    }).then(res => {
      console.log("res: ", res);
      let list = (res && res.entryList) || [];
      if (!utils.isEmptyObject(list)) {
        let page = this.data.page + 1;
        this.setData({
          page,
          list: this.data.list.concat(list)
        });
      }
    });
  },
  onReachBottom() {
    this.getUserLikeList();
  }
});
