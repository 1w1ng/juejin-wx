export const request = params => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      method: params.method || "GET",
      data: params.data,
      header: params.header,
      success: res => {
        // resolve(res);
        if (res.data.s === 1 || res.data.s === 4) {
          const data = res.data.d;
          resolve(data);
        } else {
          wx.showToast({
            title: "已全部加载",
            icon: "none"
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: "网络出现问题，请稍后再试！",
          icon: "none"
        });
      },
      complete: () => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    });
  });
};
