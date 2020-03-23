// components/articleItem/articleItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toArticleDetail(e) {
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
