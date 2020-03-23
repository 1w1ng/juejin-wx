// 1. 获取全局的数据
const config = getApp().globalData.config;
const utils = require("./../../utils/utils.js");

Page({
  data: {
    mobile: "", // 账号(手机/邮箱)
    password: "" // 密码
  },
  onLoad: function(options) {},

  // 表单提交
  commit(e) {
    let values = e.detail.value;
    let phoneNumber = values.phoneNumber || "";
    let password = values.password || "";

    // 1. 验证
    if (!phoneNumber.replace(/\s+/g, "")) {
      wx.showToast({
        title: "请输入手机或邮箱",
        icon: "none"
      });
      return;
    }

    if (!values.password.replace(/\s+/g, "")) {
      wx.showToast({
        title: "请输入登录密码",
        icon: "none"
      });
      return;
    }
    // 验证邮箱
    if (values.phoneNumber.indexOf("@") !== -1) {
      let params = {
        email: values.phoneNumber,
        password: values.password
      };
      // 发起登录请求(邮箱)
      this.login(params, "email");
    } else {
      // 发起登录请求(手机)
      this.login(values, "mobile");
    }
  },

  // 登录
  login(params, type) {
    // 1. 提示
    wx.showLoading({
      title: "正在登录中…"
    });

    // 2. 获取api
    let url = type === "mobile" ? config.loginByMobile : config.loginByEMail;

    // 3. 发起网络请求
    wx.request({
      url,
      data: params,
      method: "POST",
      success: res => {
        wx.hideLoading();
        console.log("res: ", res);
        // 3.1 判断登录的状态
        let statusCode = res.statusCode;
        if (statusCode === 401) {
          wx.showToast({
            title: "密码错误",
            icon: "none"
          });
        } else if (statusCode === 404) {
          wx.showToast({
            title: "用户名不存在",
            icon: "none"
          });
        } else if (statusCode !== 200) {
          wx.showToast({
            title: "未知错误",
            icon: "none"
          });
        }

        // 3.2 登录成功
        let data = res.data;
        if (!utils.isEmptyObject(data)) {
          wx.showToast({
            title: "成功登录",
            icon: "none"
          });
          // 3.3 本地缓存登录信息
          wx.setStorage({
            key: "auth",
            data: {
              token: data.token,
              uid: data.userId,
              clientId: data.clientId
            }
          });
          // 3.4 返回上一级界面
          wx.navigateBack({});
        } else {
          wx.showToast({
            title: "发生错误，请稍后再试！",
            icon: "none"
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: "网络出现问题， 请稍后再试！",
          icon: "none"
        });
      }
    });
  }
});
