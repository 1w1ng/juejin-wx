const config = getApp().globalData.config;
const utils = require("../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    listUser: [],
    listFollowed: [],
    auth: {},
    page: 0,
    thirduid: "",
    currentSwiper: "0"
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
    this.getUserCollectionSet();
    this.getFollowedCollectionSet();
  },

  switchSwiper(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentSwiper: parseInt(index)
    });
  },
  swiperChanged(e) {
    this.setData({
      currentSwiper: e.detail.currentItemId
    });
  },

  // 用户创建的收藏集
  getUserCollectionSet() {
    const auth = this.data.auth;
    request({
      url: `${config.collectionSetMsRequestUrl}/getUserCollectionSet`,
      data: {
        src: "web",
        userId: auth.uid || "",
        clientId: auth.clientId,
        token: auth.token || "",
        page: this.data.page,
        targetUserId: this.data.thirduid || auth.uid
      }
    }).then(res => {
      let listUser = (res && res.collectionSets) || [];
      console.log("listUser: ", listUser);
      this.setData({
        listUser: this.data.listUser.concat(listUser)
      });
    });
  },

  // 用户关注的收藏集
  getFollowedCollectionSet() {
    const auth = this.data.auth;
    request({
      url: `${config.collectionSetMsRequestUrl}/getFollowedCollectionSet`,
      data: {
        src: "web",
        userId: auth.uid || "",
        clientId: auth.clientId,
        token: auth.token || "",
        page: this.data.page,
        targetUserId: this.data.thirduid || auth.uid
      }
    }).then(res => {
      let listFollowed = (res && res.collectionSets) || [];
      this.setData({
        listFollowed: this.data.listFollowed.concat(listFollowed)
      });
    });
  }
});
