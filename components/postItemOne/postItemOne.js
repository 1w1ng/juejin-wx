let utils = require("../../utils/utils.js");
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  methods: {
    toArticleDetail(e) {
      console.log("e: ", e);
      let item = e.currentTarget.dataset.item;
      let postId = item.objectId;
      let type = item.type;
      let url = `/pages/articleDetail/articleDetail?id=${postId}&type=${type}`;
      wx.navigateTo({
        url
      });
    }
  }
});
