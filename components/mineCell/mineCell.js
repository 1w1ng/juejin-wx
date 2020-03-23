// components/mineCell/mineCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 组件传值
    // 图标的地址
    imgSrc: {
      type: String
    },
    // 主标题
    mainTitle: {
      type: String
    },
    // 子标题
    subTitle: {
      type: String
    }
  },

  externalClasses: ["reddot"],

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onMineCell() {
      // 自定义事件
      this.triggerEvent("onMineCell");
    }
  }
});
