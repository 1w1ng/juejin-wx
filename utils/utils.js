// 1. 判断一个对象是否为空
let isEmptyObject = obj => {
  for (let i in obj) {
    return false;
  }
  return true;
};

// 2. 判断是否已经登录
let isLogined = () => {
  let auth = wx.getStorageSync("auth") || {};
  if (auth.token && auth.uid) {
    return auth;
  }
  return false;
};

// 路由跳转
let navigatItem = e => {
  const url = e.currentTarget.dataset.url || "/pages/index/index";
  const open = e.currentTarget.dataset.open;
  if (open) {
    wx.navigateTo({
      url
    });
  } else {
    if (isLogined()) {
      wx.navigateTo({
        url
      });
    } else {
      wx.navigateTo({
        url: "/pages/login/login"
      });
    }
  }
};

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

module.exports = {
  isEmptyObject,
  isLogined,
  formatTime,
  navigatItem
};
