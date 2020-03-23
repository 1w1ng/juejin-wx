// components/xiaoceItem/xiaoceItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  methods: {
    toXiaoceDetail(e) {
      wx.navigateTo({
        url: `/pages/xiaocedetail/xiaocedetail?id=${e.currentTarget.dataset.id}`
      });
    }
  }
});
