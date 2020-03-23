// components/jImage/jImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: "",
      observer: function(newVal) {
        this.setSrc(newVal);
      }
    }
  },

  attached: function() {
    this.setSrc(this.data.src);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setSrc(src) {
      const imgSrc = `${getApp().globalData.imageServer}?url=${src}`;
      this.setData({
        imgSrc
      });
    }
  }
});
