//app.js
App({
  // 全局数据
  globalData: {
    imageServer: "https://images.weserv.nl/",
    config: {
      // 登录相关
      loginByMobile: "https://juejin.im/auth/type/phoneNumber",
      loginByEMail: "https://juejin.im/auth/type/email",

      // 个人中心
      // 用户信息
      userApiUrl: "https://user-storage-api-ms.juejin.im/v1",
      // 消息中心
      notifyApiUrl: "https://ufp-api-ms.juejin.im/v1",

      // 首页相关
      timelineRequestUrl: "https://timeline-merger-ms.juejin.im/v1",
      entryviewStorage: "https://entry-view-storage-api-ms.juejin.im/v1",

      // 小册
      xiaoceRequestUrl: "https://xiaoce-timeline-api-ms.juejin.im/v1",
      xiaoceCacheApiMs: "https://xiaoce-cache-api-ms.juejin.im/v1",

      // 动态
      ufpApiMsRequestUrl: "https://ufp-api-ms.juejin.im/v1",

      // 喜欢
      userLikeWrapperMsRequestUrl: "https://user-like-wrapper-ms.juejin.im/v1",

      // 标签
      goldTagMsRequestUrl: "https://gold-tag-ms.juejin.im/v1",

      // 收藏
      collectionSetMsRequestUrl: "https://collection-set-ms.juejin.im/v1"
    }
  }
});
