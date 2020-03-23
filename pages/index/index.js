const config = getApp().globalData.config;
const utils = require("./../../utils/utils.js");
import { request } from "../../utils/http.js";

Page({
  data: {
    // 请求的数据条数
    count: 20,
    // 存放数据数组
    timeline: []
  },
  onShow() {
    // 当页面没有数据的时候去加载
    if (this.data.timeline.length === 0) {
      wx.startPullDownRefresh({});
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.init();
  },
  // 上拉加载
  onReachBottom() {
    this.getEntryByTimeLine();
  },

  init() {
    this.getEntryByTimeLine();
  },
  //获取推荐列表的数据
  getEntryByTimeLine() {
    // 1. 获取数据数组
    let timeline = this.data.timeline;
    if (utils.isEmptyObject(timeline)) {
      timeline = [{ verifyCreatedAt: "" }];
    }
    // 将最后一条的 verifyCreatedAt 赋值给 before 字段
    let beforIndex = timeline.slice(-1)[0].verifyCreatedAt || "";
    console.log("beforIndex: ", beforIndex);

    wx.showLoading({
      title: "正在加载中…"
    });

    // 2. 发起请求
    request({
      url: `${config.timelineRequestUrl}/get_entry_by_timeline`,
      data: {
        src: "web",
        limit: this.data.count,
        category: "all",
        recomment: 1,
        before: beforIndex
      }
    }).then(res => {
      let list = (res && res.entrylist) || [];
      this.setData({
        timeline: this.data.timeline.concat(list)
      });
    });
  }
});
